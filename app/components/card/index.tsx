import { Drink } from '@/utils/types';
import React from 'react';
import Image from 'next/image';

export default function Card({result}: {result: Drink}) {
    
    const { strDrink, strInstructions, strDrinkThumb } = result;

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

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col lg:flex-row">
            <Image src={strDrinkThumb} alt={strDrink} className="sm:w-full lg:w-1/2 h-auto object-cover" width="600" height="600"/>
            <div className="p-4 sm:w-full lg:w-1/2">
                <h2 className="text-2xl lg:text-6xl font-semibold">{strDrink}</h2>
                <div className="w-full py-4">
                    <dl>

                        {ingredientArray.map((item, i) => (
                            <div className="flex" key={`${item.ingredient}-${i}`} >
                                <dt className="text-sm font-bold text-gray-700 w-1/2">{item.measure ? `${item.ingredient}:` : `${item.ingredient}`}</dt>
                                <dd className="text-sm  text-gray-700 w-1/2">{item.measure ?? item.measure}</dd>
                            </div>
                        ))}
                        <div className="flex">
                            <dt className="text-sm font-bold text-gray-700 w-1/2">Glass:</dt>
                            <dd className="text-sm  text-gray-700 w-1/2">{result.strGlass}</dd>
                        </div>
                    </dl>
                </div>
               
                <hr />
                <div className="py-4">
                    <p className="text-gray-600">{strInstructions}</p>
                </div>
               
            </div>
        </div>
    )
}

