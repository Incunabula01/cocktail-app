import { UserLogin } from "@/utils/types";
const signUpURL = process.env.NEXT_PUBLIC_SIGNUP_USER_URL as RequestInfo | URL;

export const registerUser = async (account: UserLogin): Promise<Record<string, string> | null> => {
    try {
        
        const response = await fetch(signUpURL, {
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