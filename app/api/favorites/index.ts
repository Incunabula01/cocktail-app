import { getSessionCookieValue } from "@/utils";
import { UserFavorites, Favorite } from "@/utils/types";

const updateFavURL = process.env.NEXT_PUBLIC_FAVORITES_URL as RequestInfo | URL;

export const updateFavorites = async (favorites: Favorite): Promise<boolean> => {
    try {
        // TODO:
        // Clear sessionStorage when user adds new favorite
        const token = getSessionCookieValue();
        const response = await fetch(updateFavURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Send the token in the Authorization header
            },
            body: JSON.stringify(favorites) // Send the payload with email and favorites
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to update favorites:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred during the update:', error);
    }

    return false;
}

export const getUserFavorites = async (): Promise<UserFavorites | null> => {
    try {
        // TODO: 
        // Add Session Storage > if it doesnt exist then log in with cookie
        const token = getSessionCookieValue();
       
       const res = await fetch(updateFavURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if(res.ok){
            return res.json();
        }
    } catch (error) {
        console.error('Get Account Info Error', error);
    }
    return null;
}

export const deleteFavorites = async (strDrink: string): Promise<Favorite[] | null> => {
    try {
        // TODO:
        // Clear sessionStorage when user adds new favorite
        const token = getSessionCookieValue();
        
        const response = await fetch(updateFavURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({strDrink})
        });

        if (response.ok) {
            const { updateUser } = await response.json();
            console.log('delete favorites', updateUser.favorites);
            return updateUser.favorites;
        } else {
            console.error('Failed to delete favorites:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred during the update:', error);
    }

    return null;
}
