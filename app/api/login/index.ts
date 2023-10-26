import { UserLogin } from "@/utils/types";

const loginUserURL = process.env.NEXT_PUBLIC_LOGIN_USER_URL as RequestInfo | URL;

export const loginUser = async (account: UserLogin): Promise<Record<string, string> | null> => {
    
    try {
        const response = await fetch(loginUserURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account)
        });
        const resJson = await response.json();
       
        return resJson;
    } catch (error) {
        console.error('Login Error!', error);
    }
    return null;
}