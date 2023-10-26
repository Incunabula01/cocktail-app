import { Drink } from "@/utils/types";
import { getUserFavorites } from "../favorites";

export async function cocktailLookahead(query:string) {
   
    if(query !== ''){
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}search.php?s=${query}`);
            const resJSON = await response.json();
            return resJSON.drinks.map((el: { strDrink: Drink; }) => el.strDrink);

        } catch (error) {
            console.error('Unexpected error has occured!', error);
        }
    }
}

export async function getSearchResults(query: string) {
    if (query !== '') {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}search.php?s=${query}`);
            const resJSON = await response.json();
            const getFavorites = await getUserFavorites();

            const isFavorite = getFavorites?.userFavorites.find(item => item.strDrink === query) ? true : false;
            
            return { ...resJSON.drinks[0], isFavorite };

        } catch (error) {
            console.error('Unexpected error has occured!', error);
        }
    }
}

export async function getRandomResults() {
   
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}random.php`);
            const resJSON = await response.json();
            return resJSON.drinks;

        } catch (error) {
            console.error('Unexpected error has occured!', error);
        }
    
}