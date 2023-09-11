import { Drink } from "@/utils/types";

export async function cocktailLookahead(query:string) {
    console.log('API URL', process.env.NEXT_PUBLIC_API_URL);
    if(query !== ''){
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?s=${query}`);
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?s=${query}`);
            const resJSON = await response.json();
            return resJSON.drinks;

        } catch (error) {
            console.error('Unexpected error has occured!', error);
        }
    }
}