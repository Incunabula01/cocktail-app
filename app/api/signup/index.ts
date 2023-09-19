
// import { setCookieFromHeader } from "@/utils";
import { UserLogin } from "@/utils/types";

export const registerUser = async (accouunt: UserLogin): Promise<Boolean> => {
    try {
        const signUpURL = process.env.NEXT_PUBLIC_SIGNUP_USER_URL as RequestInfo | URL;
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
            // const setCookie = response.headers.get('Set-Cookie');
            // setCookieFromHeader(setCookie);
            // console.log('cookies', document.cookie);
            return true;
        }
    } catch (error) {
        console.error('Login Error!', error);
    }
    return false;
}