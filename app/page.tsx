"use client";
import { Drink } from '@/utils/types';
import Search from './components/search';
import { useEffect, useState } from 'react';
import { cocktailLookahead, getSearchResults, getRandomResults } from './api/search/route';
import Card from './components/card';
import { deleteFavorites, updateFavorites } from './api/favorites';
import { Favorite } from '@/utils/types';
import { useAuth } from './context';
import { getSessionCookieValue  } from '@/utils';
import Loading from './components/loading';

export default function Home() {
  const [searchItems, setSearchItems] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Drink>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        setIsLoading(true);
        const results = await getSearchResults(selected);
        setIsLoading(false);
        setSearchResults(results);
      } catch (error) {
        console.error('An Error occured!', error);
      } finally {
        setSearchItems([]);
      }
    }
  }

  const handleRandom = async () => {
    try {
      setIsLoading(true);
      const results = await getRandomResults();
      setIsLoading(false);
      setSearchResults(results[0]);
    } catch (error) {
      console.error('An Error occured!', error);
    } finally {
      setSearchItems([]);
    }
  }

  const handleFavSelect = async (fav: Favorite, isFav: boolean) => {
   try {
     let response;
     if (isFav) {
       response = await updateFavorites(fav);
     } else {
        response = await deleteFavorites(fav.strDrink);
     }
     if(response){
      console.log('Favorite successfully edited!')
     }
   } catch (error) {
     console.error('An Error occured!', error);
   }
  }

  useEffect(() => {
    if(!searchResults){
      handleRandom();
    }

    if (getSessionCookieValue()) {
        dispatch({ type: 'LOGIN' });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  return (
    <>
      <div className="p-4 w-full" >
        <Search
          onInputChange={handleInputChange}
          onSelect={handleSelect}
          onRandom={handleRandom}
          searchItems={searchItems} />
      </div>
      <div className="bg-teal-50 shadow-md rounded-lg p-4 sm:w-80 lg:w-full">
        {isLoading ? 
          <Loading/> :
          searchResults && <Card result={searchResults} onFavSelect={handleFavSelect} hasFav={true} />
        }
      </div>
    </>
    
  )
}
