import { prisma } from "@/prisma";
import { connectToDb } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

import jwt from 'jsonwebtoken';

export const PUT = async (req: NextRequest) => {
    try {
        const jwtKey = process.env.JWT_KEY || '';
       
        const favorites = await req.json();
        
        console.log('favorites ==>', favorites);

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
        
        const updatedFavorites = getUser.favorites.length ? [...getUser.favorites, favorites] : favorites;
        console.log('updatedFavorites', updatedFavorites);
        const updateUser = await prisma.user.update({ 
            where: { email: decodedToken.userId }, 
            data: { favorites: { set: updatedFavorites } } 
        });

        return NextResponse.json({ updateUser }, { status: 200 });
    } catch (error: any) {
        console.error(`An error has occurred! ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
