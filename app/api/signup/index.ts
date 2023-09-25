import { UserLogin } from "@/utils/types";
const signUpURL = process.env.NEXT_PUBLIC_SIGNUP_USER_URL as RequestInfo | URL;

export const registerUser = async (accouunt: UserLogin): Promise<Boolean> => {
    try {
        
        console.log('register user', signUpURL);
        const response = await fetch(signUpURL, {
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