"use client";
import React, { useEffect, useState } from 'react';
import { Drink, Favorite } from '@/utils/types';
import { getSearchResults } from '../../api/search/route';
import Card from '../../components/card';

type CocktailPageProps = {
    params: {
        id: string;
    };
}

export default function CocktailPage({ params }: CocktailPageProps) {
    const [searchResults, setSearchResults] = useState<Drink>()
    

    useEffect(() => {
        const getParamResuts = async () => {
            
            const urlParamId = decodeURIComponent(params.id.replace(/\+/g, " "));
            const results = await getSearchResults(urlParamId);
            
            setSearchResults(results);
        }

        if(params.id){
            getParamResuts();
        }
    }, [params.id]);

    return (
        <>
            <div className="bg-teal-50 shadow-md rounded-lg p-4 sm:w-80 lg:w-full">
                {searchResults && <Card result={searchResults} hasFav={false}/>}
            </div>
        </>
    )
}
