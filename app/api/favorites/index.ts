import { getSessionCookieValue } from "@/utils";
import { Favorite } from "@/utils/types";



export const updateFavorites = async (favorites: Favorite): Promise<boolean> => {
    try {
        const updateFavURL = 'http://localhost:3000/api/favorites';
        console.log('favs', JSON.stringify(favorites));
        const cookies = document.cookie;
        const token = getSessionCookieValue(cookies);
        console.log('token', token);
        const response = await fetch(updateFavURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Send the token in the Authorization header
            },
            body: JSON.stringify(favorites) // Send the payload with email and favorites
        });

        if (response.ok) {
            const { updatedUser } = await response.json();
            console.log('updateFavorites', updatedUser);
            return true;
        } else {
            console.error('Failed to update favorites:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred during the update:', error);
    }

    return false;
}
