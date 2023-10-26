"use client";
import { Drink, Favorite } from '@/utils/types';
import React, { useEffect, useMemo, useState } from 'react';
import CustomImage from '../customImage';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { SlSocialYoutube, SlBadge, SlBan } from 'react-icons/sl';

type CardProps = {
    result: Drink;
    hasFav: boolean;
    onFavSelect?: (fav: Favorite, state: boolean) => void;
}

export default function Card({ result, onFavSelect, hasFav = true }: CardProps) {
    const [resultData, setResultData] = useState<Drink>();
    const [favorite, setFavorite] = useState<boolean>(false);

    const handleFavSelect = ({ strDrinkThumb, strDrink }: Favorite): void => {
        onFavSelect?.({ strDrinkThumb, strDrink }, !favorite);
        setFavorite(!favorite);
    }

    useMemo(() => {
        if(result){
            const ingredientArray = [];

            for (let i = 1; i <= 15; i++) {
                const ingredientKey = `strIngredient${i}`;
                const measureKey = `strMeasure${i}`;

                if (result[ingredientKey]) {
                    ingredientArray.push({
                        ingredient: result[ingredientKey],
                        measure: result[measureKey],
                    });
                }
            }
            const formatedResults = { ...result, ingredients: ingredientArray };
            setFavorite(result.isFavorite);
            setResultData(formatedResults);
        }
    }, [result]);
    
    if(resultData) {
        const { strDrink, strInstructions, strDrinkThumb, ingredients, strGlass, strAlcoholic, strVideo, strIBA } = resultData;
        
        return (
            <>
                {resultData &&
                   
                        <div className='lg:w-full'>
                            <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col lg:flex-row">
                                <div className='sm:w-full lg:w-1/4 h-[400px] lg:h-[inherit]  relative'>
                                    <CustomImage src={strDrinkThumb} alt={strDrink} />
                                </div>
                                <div className="p-4 sm:w-full lg:w-3/4">
                                    <div className="flex flex-row  justify-between mb-2">
                                        <div className='flex gap-4'>
                                            <h2 className="text-3xl lg:text-6xl font-semibold">{strDrink}</h2>
                                            {strIBA &&
                                                <div className="flex gap-1 flex-wrap content-end">
                                                    <SlBadge size="20" title={`IBA ${strIBA}`} />
                                                    <p>{strIBA}</p>
                                                </div>
                                            }
                                            {strAlcoholic !== "Alcoholic" &&
                                                <div className="flex gap-1 flex-wrap content-end">
                                                    <SlBan size="20" title='Non-Alcoholic' />
                                                    <p>Non-Alcoholic</p>
                                                </div>
                                            }
                                        </div>

                                        {hasFav &&
                                            <button onClick={() => handleFavSelect({ strDrinkThumb, strDrink })}>
                                                {favorite ? (<IoHeart size="20" />) : (<IoHeartOutline size="20" />)}
                                            </button>
                                        }
                                    </div>
                                    <hr />
                                    <div className="w-full py-3">
                                        <p className="font-semibold mb-2">Ingredients:</p>
                                        <dl>

                                            {ingredients.map((item: { ingredient: string; measure: string; }, i: number) => (
                                                <div className="flex" key={`${item.ingredient}-${i}`} >
                                                    <dt className="text-sm font-bold text-gray-700 w-1/4">{item.measure ? `${item.ingredient}:` : `${item.ingredient}`}</dt>
                                                    <dd className="text-sm  text-gray-700 w-2/3">{item.measure ?? item.measure}</dd>
                                                </div>
                                            ))}
                                            <div className="flex">
                                                <dt className="text-sm font-bold text-gray-700 w-1/4">Glass:</dt>
                                                <dd className="text-sm  text-gray-700 w-2/3">{strGlass}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <hr />
                                    <div className="py-4">
                                        {strVideo &&
                                            <a className='flex gap-1 mb-2 hover:underline hover:text-rose-800 visited:text-rose-950' href={strVideo} target='_blank' rel='noopener noreferrer' title={`How to make a ${strDrink}`}>
                                                <SlSocialYoutube size="20" />
                                                <p>{`How to make a ${strDrink} (video)`}</p>
                                            </a>
                                        }

                                        <p className="text-gray-600">{strInstructions}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                   
                }
            </>


        )
        
    }
    return null;
}

