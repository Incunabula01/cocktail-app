"use client";
import React, { useEffect, useState } from 'react';
import { Drink } from '@/utils/types';
import { getSearchResults } from '../../api/search';
import Card from '../../components/card';
import Loading from '@/app/components/loading';

type CocktailPageProps = {
    params: {
        id: string;
    };
}

export default function CocktailPage({ params }: CocktailPageProps) {
    const [searchResults, setSearchResults] = useState<Drink>()
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getParamResuts = async () => {
            setLoading(true);
            const urlParamId = decodeURIComponent(params.id.replace(/\+/g, " "));
            const results = await getSearchResults(urlParamId);
            setLoading(false);
            setSearchResults(results);
        }

        if(params.id){
            getParamResuts();
        }
    }, [params.id]);

    return (
        <>  
            {loading ? 
                <Loading/> :
                <>
                    
                    <div className="flex justify-center items-center lg:h-[80vh] w-full">
                        {searchResults && <Card result={searchResults} hasFav={false} />}
                    </div>
                </>
            }
        </>
    )
}
