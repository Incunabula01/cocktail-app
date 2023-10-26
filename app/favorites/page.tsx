"use client";
import React, { useEffect, useState } from 'react';
import { PageProps } from "@/.next/types/app/page";
import Modal from '../components/modal';
import LoginForm from '../components/login';
import { useSelector } from 'react-redux';
import {RootState} from '@/store';
import { LiaGlassMartiniAltSolid } from 'react-icons/lia';
import { Favorite } from '@/utils/types';
import { getUserFavorites, deleteFavorites } from '../api/favorites';
import Link from 'next/link';
import { SlClose } from 'react-icons/sl';
import CustomImage from '../components/customImage';
import Loading from '../components/loading';
import SignupForm from '../components/signup';

export default function Favorites(props: PageProps) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [formType, setFormType] = useState('');
    const [favorites, setFavorites] = useState<Favorite[] | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const authState = useSelector((state: RootState) => state.auth.isLoggedIn);

    const fetchFavorites = async () => {
        try {
            setFavorites([]);
            setIsLoading(true);

            const res = await getUserFavorites();
    
            setFavorites(res?.userFavorites);
            setIsLoading(false);
        } catch (error) {
            console.error('get favorites error', error);
        }
    }

    useEffect(() => {
        if (authState){
            fetchFavorites();
            setModalIsOpen(false);
        }
        
    }, [authState]);

    const handleModal = (event:React.SyntheticEvent<HTMLButtonElement>) => {
        setFormType(event.currentTarget.name);
        setModalIsOpen(true);
    }

    const handleDeleteFavorite = async  (event: React.SyntheticEvent<HTMLButtonElement>) => {
        const res = await deleteFavorites(event.currentTarget.name);
        if (res) {
            console.log('favorite removed!', res);
            setFavorites(res);
        }
    }

    return (
        <>
           
            {authState ? 
                <>
                    <div className="p-4 sm:w-full lg:w-1/2">
                        <h2 className='text-4xl text-white'>Favorite Cocktails</h2>
                    </div>
                    <hr className='w-full'/>
                    <div className="bg-white shadow-md rounded-lg p-4 sm:w-full lg:w-1/2">
                        {isLoading ?
                            <Loading /> :
                            <div className="max-h-[70vh] overflow-y-scroll">
                                <ul className='space-y-3'>
                                    {favorites?.length ? favorites.map(el => (
                                        <li key={el.id} className='rounded-lg  border-rose-700 border hover:bg-rose-100 font-semibold flex justify-between'>
                                            <div className='flex flex-row gap-4 rounded-l-lg overflow-hidden items-center'>
                                                <div className='relative w-[80px] h-[80px]'>
                                                    <CustomImage src={el.strDrinkThumb} alt={el.strDrink} />
                                                </div>

                                                <Link href={`/favorites/${el.strDrink}`} className='cursor-pointer py-4 translate-y-1'>
                                                    {el.strDrink}
                                                </Link>
                                            </div>

                                            <button onClick={handleDeleteFavorite} title='Remove Favorite' name={el.strDrink} className='p-4'>
                                                <SlClose size="20" />
                                            </button>
                                        </li>
                                    )) :
                                        <li><p>No Favorites available. Please add some.</p></li>
                                    }
                                </ul>
                            </div>

                            
                        }
                    </div>
                </>
                     :
                    <div className = "bg-teal-50 shadow-md rounded-lg p-4 sm:w-80 lg:w-1/2 mx-auto">
                        <div className='flex flex-col justify-center items-center p-2 gap-2'>
                            <LiaGlassMartiniAltSolid size="250" className="text-grey" />
                            <h3 className='text-rose-700 text-semibold text-2xl'>No Favorites Available</h3>
                            <p>Please login or sign up to view favorites.</p>
                            <div className="flex gap-2">
                                <button className="bg-rose-600 text-white hover:bg-rose-700  py-2 px-4 rounded-lg" onClick={handleModal} name="login">
                                    Login
                                </button>
                                <button className="bg-rose-900 text-white hover:bg-rose-950  py-2 px-4 rounded-lg" onClick={handleModal} name="signUp">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                    
            }
           
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                {formType === 'login' ?
                    <LoginForm /> :
                    <SignupForm/>
                }
            </Modal>
        </>
    )
}
