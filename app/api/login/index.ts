
import { UserLogin } from "@/utils/types";

export const loginUser = async (accouunt: UserLogin): Promise<Boolean> => {
    
    try {
        const loginUserURL = process.env.NEXT_PUBLIC_LOGIN_USER_URL as RequestInfo | URL;
        console.log('login user', loginUserURL);
        const response = await fetch(loginUserURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accouunt)
        });
        if(response.ok){
            return true;
        }
    } catch (error) {
        console.error('Login Error!', error);
    }
    return false;
}