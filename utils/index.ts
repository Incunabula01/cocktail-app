import { prisma } from "@/prisma";
import { parse } from 'cookie';
import { NextApiRequest } from "next";

export const connectToDb = async () => {
    try {
        await prisma?.$connect()
    } catch (error: any) {
        return new Error('Can not connect to db', error.message);
    }
}

export const getSessionCookieValue = () => {
    const cookies = document.cookie;
    
    if (cookies?.length) {
        const cookieArray = cookies.split(';');
        const cookieObject: { [key: string]: string } = {};

        for (const cookie of cookieArray) {
            const [name, value] = cookie.trim().split('=');
            cookieObject[name] = value;
        }

        // Access a specific session cookie by name
        return cookieObject['OutSiteJWT'];
    }
    return null;
}

export const TOKEN_AGE = 60 * 60 * 24 * 30;

// TODO:
// Create sessionStorage util function for clearing and checking
