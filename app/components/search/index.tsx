"use client";
import React, {useEffect, useState} from 'react';

interface SearchProps {
    onInputChange: (queryItem: string) => void;
    onSelect: (selectedItem: string) => void;
    onRandom: () => void;
    searchItems: string[];
}

export default function Search({ onInputChange, onSelect, onRandom, searchItems }: SearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setResults([]);
        setQuery(inputValue);
        onInputChange(query);
    };

    const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
        const selectedItem = event.currentTarget.dataset.id ?? '';
        setQuery(selectedItem);
        onSelect(selectedItem);
        setResults([]);
    }

    const handleRandom = () => {
        setQuery('');
        setResults([]);
        onRandom();
    }

    useEffect(() => {
        if (searchItems?.length > 0){
            setResults(searchItems);
        }
    }, [searchItems]);

    return (
        <div className="relative w-full">
            <div className="lg:flex lg:flex-row lg:justify-between gap-3">
                <input
                    type="text"
                    className="w-full mb-2 lg:mb-0 lg:w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button className="bg-rose-800 text-white hover:bg-rose-900 border py-2 px-4 rounded-lg w-full lg:w-1/4" onClick={handleRandom}>
                    I'm Feeling Lucky
                </button>
            </div>
           
            
            {(results.length > 0) && (
                <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md">
                    {results.map((result, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                            onClick={handleSelect}
                            data-id={result}
                        >
                            {result}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
