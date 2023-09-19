import { prisma } from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { TOKEN_AGE } from "@/utils";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export const POST = async (req: Request) => {
    try {
        const jwtKey = process.env.JWT_KEY || '';
        const { email, password } = await req.json();

        if (!email && !password) {
            return NextResponse.json({ error: "Invalid Data" }, { status: 422 });
        }
        await connectToDb();

        const existingUser = await prisma.user.findFirst({ where: { email } });

        if (!existingUser) {
            return NextResponse.json({ message: "User not registered" }, { status: 401 });
        }

        const checkPassword = await bcrypt.compare(password, existingUser.password);
        if (!checkPassword) {
            return NextResponse.json({ message: "Invalid Password" }, { status: 403 });
        }
        const token = sign({ userId: existingUser.email }, jwtKey, {
            expiresIn: TOKEN_AGE, // Token expiration time
        });

        const seralizedCookie = serialize('OutSiteJWT', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: TOKEN_AGE,
            path: '/'
        });

        return NextResponse.json({ message: "Logged in!", token }, {
            status: 201, 
            headers: {
                'Set-Cookie': seralizedCookie
            } 
        });

    } catch (error: any) {
        console.error(`An error has occured! ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}