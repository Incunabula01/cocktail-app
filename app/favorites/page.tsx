"use client";
import React, { useEffect, useState } from 'react';
import { PageProps } from "@/.next/types/app/page";
import Modal from '../components/modal';
import LoginForm from '../components/login';
import { useAuth } from '../context';
import { LiaGlassMartiniAltSolid } from 'react-icons/lia';
import { UserAccount } from '@/utils/types';
import { loginUser } from '../api/login';
import { registerUser } from '../api/signup';

export default function Favorites(props: PageProps) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const { state, dispatch } = useAuth();
    const [formType, setFormType] = useState('');

    const handleSubmit = async (account: UserAccount, type: string) => {
        let response;
        if (type === 'login'){
            response = await loginUser(account);
        } else {
            response = await registerUser(account);
        }
        
        if(response){
            dispatch({ type: 'LOGIN' });
        }
        setModalIsOpen(false);
    }
    const handleModal = (event:React.SyntheticEvent<HTMLButtonElement>) => {
        setFormType(event.currentTarget.name);
        setModalIsOpen(true);
    }

    return (
        <>
            <div className="bg-teal-50 shadow-md rounded-lg p-4 sm:w-80 lg:w-1/2 mx-auto">
                {state.isLoggedIn ? 
                    <div>
                        Favorites Here!
                    </div> :
                    <div className='flex flex-col justify-center items-center p-2 gap-2'>
                        <LiaGlassMartiniAltSolid size="500" className="text-grey"/>
                        <h3 className='text-rose-700 text-semibold text-2xl'>No Favorites Available</h3>
                        <p>Please login or sign up to view favorites.</p>
                        <div className="flex gap-2">
                            <button className="bg-rose-800 text-white hover:bg-rose-900  py-2 px-4 rounded-lg" onClick={handleModal} name="login">
                                Login
                            </button>
                            <button className="bg-rose-900 text-white hover:bg-rose-950  py-2 px-4 rounded-lg" onClick={handleModal} name="signUp">
                                Sign Up
                            </button>
                        </div>
                    </div>
            }
            </div>
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <LoginForm onSubmit={(account, type) => handleSubmit(account, type)} formType={formType}/>
            </Modal>
        </>
    )
}
