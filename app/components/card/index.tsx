"use client";
import { Drink, Favorite } from '@/utils/types';
import React, { useMemo, useState } from 'react';
import CustomImage from '../customImage';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

type CardProps = {
    result: Drink;
    hasFav: boolean;
    onFavSelect?: (fav: Favorite) => void;
}

export default function Card({ result, onFavSelect, hasFav = true }: CardProps) {
    const [resultData, setResultData] = useState<Drink>();

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
            setResultData(formatedResults);
        }
    }, [result]);

    if(resultData) {
        const { strDrink, strInstructions, strDrinkThumb, favorite, ingredients, strGlass, strAlcoholic } = resultData;

        return (
            <>
                {resultData &&
                    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col lg:flex-row">
                        <div className='sm:w-full lg:w-1/4 h-auto'>
                            <CustomImage src={strDrinkThumb} alt={strDrink} width={400} height={600} />
                        </div>
                        <div className="p-4 sm:w-full lg:w-3/4">
                            <div className="flex flex-row  justify-between">
                                <h2 className="text-2xl lg:text-6xl font-semibold">{strDrink}</h2>
                                {hasFav &&
                                    <button onClick={() => onFavSelect && onFavSelect({ strDrinkThumb, strDrink })}>
                                        {favorite ? <IoHeart size="20" /> : <IoHeartOutline size="20" />}
                                    </button>
                                }
                            </div>
                            <div className="w-full py-4">
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
                                {strAlcoholic !== "Alcoholic" &&
                                    <p className='italic'>(Non-Alcoholic)</p>
                                }
                                <p className="text-gray-600">{strInstructions}</p>
                            </div>

                        </div>
                    </div>

                }
            </>


        )
        
    }
    return null;
}

