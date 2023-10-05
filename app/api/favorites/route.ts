import { prisma } from "@/prisma";
import { connectToDb } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import jwt from 'jsonwebtoken';

export const PUT = async (req: NextRequest) => {
    try {
        const jwtKey = process.env.JWT_KEY || '';

        const { strDrinkThumb, strDrink } = await req.json();

        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: "Authorization header missing" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, jwtKey) as { userId: string };

        await connectToDb();

        const getUser = await prisma.user.findFirst({ where: { email: decodedToken.userId }, include: { favorites: true }});
        console.log('getUser', getUser);
        
        if(getUser){

            const favorite = {
                strDrink,
                strDrinkThumb,
            };

            const updateUser = await prisma.user.update({
                where: { email: decodedToken.userId },
                data: { 
                    favorites: {
                        upsert: {
                            where: { 
                                id: getUser.id 
                            },
                            create: favorite,
                            update: favorite,
                        }
                    } 
                }
            });

            return NextResponse.json({ updateUser }, { status: 200 });
        }

        
        return null;
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

        const { strDrink } = await req.json();

        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        console.log('token ===>', token);
        console.log('jwt key ===>', jwtKey);
        console.log('item to remove', strDrink);

        if (!token) {
            return NextResponse.json({ error: "Authorization header missing" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, jwtKey) as { userId: string };

        await connectToDb();

        const getUser = await prisma.user.findUnique({ where: { email: decodedToken.userId }, include: { favorites: true } });
        console.log('getUser', getUser);

        if(getUser){
            const filterFavorites = getUser.favorites.filter((item: { strDrink: string; }) => item.strDrink === strDrink);

            console.log('favorite id', filterFavorites[0].id);
            
            const updateUser = await prisma.user.update({
                where: { email: decodedToken.userId },
                data: {
                    favorites: {
                        delete: [{ id: filterFavorites[0].id }]
                    },
                },
                include: {
                    favorites: true
                }
            });

            console.log(' updated user favorites', updateUser);


            return NextResponse.json({ updateUser }, { status: 200 });
        }
        return null;
        
    } catch (error: any) {
        console.error(`An error has occurred! ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
