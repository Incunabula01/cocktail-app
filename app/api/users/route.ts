import { prisma } from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const GET = async (req: Request) => {
    try {
        const jwtKey = process.env.JWT_KEY || '';
        const token = req.headers.get('Authorization');
        if (!token) {
            return NextResponse.json({ error: "Authorization header missing" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, jwtKey) as { userId: string };
        if (!decodedToken || decodedToken.userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        }

        await connectToDb();
        const users = await prisma?.user.findFirst({ where: { email: decodedToken.userId } });

        return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
        console.error(`An error has occured! ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}