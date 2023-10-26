const logoutUserUrl = process.env.NEXT_PUBLIC_LOGOUT_USER_URL as RequestInfo | URL;

export const logoutUser = async (): Promise<Boolean> => {

    try {
      
        const response = await fetch(logoutUserUrl, {
            method: 'POST',
            credentials: 'include',
        });
        
        if (response.ok) {
            return true;
        }
    } catch (error) {
        console.error('Login Error!', error);
    }
    return false;
}