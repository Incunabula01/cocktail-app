import { prisma } from "@/prisma";
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

const jwtKey = process.env.JWT_KEY || '';


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
        return cookieObject['OutSiteJWT'];
    }
    return null;
}

export const TOKEN_AGE = 60 * 60 * 24 * 30;

export const signUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
});