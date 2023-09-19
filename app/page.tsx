"use client";
import { Drink } from '@/utils/types';
import Search from './components/search';
import { useEffect, useState } from 'react';
import { cocktailLookahead, getSearchResults, getRandomResults } from './api/search/route';
import Card from './components/card';
import { updateFavorites } from './api/favorites';
import { Favorite } from '@/utils/types';
import { useAuth } from './context';
import { getSessionCookieValue  } from '@/utils';

export default function Home() {
  const [searchItems, setSearchItems] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Drink>();
  const { dispatch } = useAuth();


  const handleInputChange = async (input: string) => {
    if(input !== ''){
      try {
        const results = await cocktailLookahead(input);
        setSearchItems(results);
      } catch (error) {
        console.error('An Error occured!', error);
      }
    }
  }

  const handleSelect = async (selected: string) => {
    if (selected !== '') {
      try {
        const results = await getSearchResults(selected);
        setSearchResults(results[0]);
      } catch (error) {
        console.error('An Error occured!', error);
      } finally {
        setSearchItems([]);
      }
    }
  }

  const handleRandom = async () => {
    try {
      const results = await getRandomResults();
      setSearchResults(results[0]);
    } catch (error) {
      console.error('An Error occured!', error);
    } finally {
      setSearchItems([]);
    }
  }

  const handleFavSelect = async (fav: Favorite) => {
   try {
     const response = await updateFavorites(fav);
     if(response){
      console.log('Favorite successfully saved!')
     }
   } catch (error) {
     console.error('An Error occured!', error);
   }
  }

  useEffect(() => {
    if(!searchResults){
      handleRandom();
    }

    const cookies = document.cookie;

    if (getSessionCookieValue(cookies)) {
      console.log('Session cookie value:', getSessionCookieValue(cookies));
        dispatch({ type: 'LOGIN' });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  return (
    <>
      <main className="container mx-auto items-center min-h-screen flex flex-col gap-3">
        <div className="bg-teal-50 shadow-md rounded-lg p-4 w-full" >
          <Search
            onInputChange={handleInputChange}
            onSelect={handleSelect}
            onRandom={handleRandom}
            searchItems={searchItems} />
        </div>
        <div className="bg-teal-50 shadow-md rounded-lg p-4 sm:w-80 lg:w-full">
          {searchResults && <Card result={searchResults} onFavSelect={handleFavSelect}/>}
        </div>
      </main>
    </>
    
  )
}
