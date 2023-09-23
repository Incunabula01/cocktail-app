import { prisma } from "@/prisma";
import { connectToDb } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

import jwt from 'jsonwebtoken';

export const PUT = async (req: NextRequest) => {
    try {
        const jwtKey = process.env.JWT_KEY || '';
       
        const { strDrinkThumb, strDrink } = await req.json();

        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        console.log('token ===>', token);
        console.log('jwt key ===>', jwtKey);
        if (!token) {
            return NextResponse.json({ error: "Authorization header missing" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, jwtKey) as { userId: string };
        // console.log('decoded token ==>', decodedToken.userId);
        
        // if (decodedToken['userId']) {
        //     return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        // }

        await connectToDb();

        const getUser = await prisma.user.findFirst({ where: { email: decodedToken.userId } });
        console.log('getUser', getUser);

        const favorite = {
            strDrink,
            strDrinkThumb
        };

        const updatedFavorites = (getUser?.favorites || []).length ? [...getUser?.favorites, favorite] : [favorite];
        console.log('updatedFavorites', updatedFavorites);

        const updateUser = await prisma.user.update({ 
            where: { email: decodedToken.userId }, 
            data: { favorites: { create: updatedFavorites } } 
        });

        return NextResponse.json({ updateUser }, { status: 200 });
    } catch (error: any) {
        console.error(`An error has occurred! ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const jwtKey = process.env.JWT_KEY || '';
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: "Authorization header missing" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, jwtKey) as { userId: string };
        console.log('token ===>', token);
        console.log('jwt key ===>', jwtKey);
        
        await connectToDb();

        const getUser = await prisma.user.findFirst({ where: { email: decodedToken.userId }, select: { favorites: true} });
        const userFavorites = getUser?.favorites;
        
        console.log('getUser', userFavorites);
        return NextResponse.json({ userFavorites }, { status: 200 });
    } catch (error: any) {
        console.error(`An error has occurred! ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const jwtKey = process.env.JWT_KEY || '';

        const { id } = await req.json();

        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        console.log('token ===>', token);
        console.log('jwt key ===>', jwtKey);
        if (!token) {
            return NextResponse.json({ error: "Authorization header missing" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, jwtKey) as { userId: string };
        // console.log('decoded token ==>', decodedToken.userId);

        // if (decodedToken['userId']) {
        //     return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        // }

        await connectToDb();

        const getUser = await prisma.user.findFirst({ where: { email: decodedToken.userId } });
        console.log('getUser', getUser);

        const updatedFavorites = (getUser?.favorites || []).length ? [...getUser?.favorites, favorite] : [favorite];
        console.log('updatedFavorites', updatedFavorites);

        const updateUser = await prisma.user.update({
            where: { email: decodedToken.userId },
            data: { favorites: { create: updatedFavorites } }
        });

        return NextResponse.json({ updateUser }, { status: 200 });
    } catch (error: any) {
        console.error(`An error has occurred! ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}