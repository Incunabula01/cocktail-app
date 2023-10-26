import { prisma } from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

import { TOKEN_AGE } from "@/utils";
import { serialize } from "cookie";
import { sign } from 'jsonwebtoken';

export const POST = async (req: Request) => {
    try {
        const jwtKey = process.env.JWT_KEY || '';
        const { name, email, password } = await req.json();

        if (!name && !email && !password) {
            return NextResponse.json({ error: "Invalid Data" }, { status: 422 });
        }

        await connectToDb();

        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User is already registered, Please login" }, { status: 403 });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        const users = await prisma?.user.create({ 
            data: { name, email, 
                password: hashPassword, 
                favorites: {
                    create: []
                }
            } 
        });

        const token = sign({ userId: users.email }, jwtKey, {
            expiresIn: TOKEN_AGE, // Token expiration time
        });

        const seralizedCookie = serialize('OutSiteJWT', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: TOKEN_AGE,
            path: '/'
        });
        const userName = users.name;

        return NextResponse.json({ 
            userName
        }, { 
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