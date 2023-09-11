"use client";
import { Drink } from '@/utils/types';
import Search from './components/search';
import { useState } from 'react';
import { cocktailLookahead, getSearchResults } from './api/search/route';
import Card from './components/card';

export default function Home() {
  const [searchItems, setSearchItems] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<Drink>();

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

  return (
    <main className="container mx-auto items-center min-h-screen flex flex-col gap-3 mt-[80px]">
      <div className="bg-teal-50 shadow-md rounded-lg p-4 w-full" >
        <Search onInputChange={handleInputChange} onSelect={handleSelect} searchItems={searchItems}/>
        </div>
      <div className="bg-teal-50 shadow-md rounded-lg p-4 sm:w-80 lg:w-full">
          {searchResults !== undefined ? 
            <Card result={searchResults}/> :
            <div>No Results Found!</div>
          }
        </div>
    </main>
  )
}
