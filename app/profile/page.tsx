"use client";
import React, { useState } from 'react';
import LoginForm from '../components/login';
import { useSelector } from 'react-redux';
import { LiaGlassMartiniAltSolid, LiaUserAltSolid } from 'react-icons/lia';
import Modal from '../components/modal';
import SignupForm from '../components/signup';
import { logoutUser } from '../api/logout';
import { useDispatch } from 'react-redux';
import { logOut } from '@/store/authReducer';
import { showToast } from '@/store/notificationReducer';
import { RootState } from '@/store';

export default function Profile(props: any) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [formType, setFormType] = useState('');

    const authState = useSelector((state: RootState) => ({
        isLoggedIn: state.auth.isLoggedIn,
        userName: state.auth.user
    }));
    
    const dispatch = useDispatch();

    const handleModal = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        setFormType(event.currentTarget.name);
        setModalIsOpen(true);
    }
    
    const handleLogout = async () => {
        const response = await logoutUser();
        if (response) {
            localStorage.setItem('userName', '');
            dispatch(logOut());
            dispatch(showToast({ message: 'Successfully logged out!', type: 'success' }))
        } else {
            dispatch(showToast({ message: 'Unexpected error, can not log out!', type: 'error' }));
        }
    }

    return (
        <>
            <div className="bg-teal-50 shadow-md rounded-lg p-4 sm:w-80 lg:w-1/2 mx-auto">
                <div className='flex flex-col justify-center items-center p-2 gap-2'>
                    {authState.isLoggedIn ?
                        <>
                            <LiaUserAltSolid size="250" className="text-grey" />
                            <h3 className='text-rose-700 text-semibold text-2xl'>Logged in as:</h3>
                            <p>{authState.userName}</p>
                            <div className="flex gap-2">
                                <button className="bg-rose-600 text-white hover:bg-rose-700  py-2 px-4 rounded-lg" onClick={handleLogout} name="logout">
                                    Logout
                                </button>
                            </div>
                        </>
                    : 
                        <>
                            <LiaGlassMartiniAltSolid size="250" className="text-grey" />
                            <h3 className='text-rose-700 text-semibold text-2xl'>Login/Signup</h3>
                            <p>Please login or create an account.</p>
                            <div className="flex gap-2">
                                <button className="bg-rose-600 text-white hover:bg-rose-700  py-2 px-4 rounded-lg" onClick={handleModal} name="login">
                                    Login
                                </button>
                                <button className="bg-rose-900 text-white hover:bg-rose-950  py-2 px-4 rounded-lg" onClick={handleModal} name="signUp">
                                    Sign Up
                                </button>
                            </div>
                        </>
                    }
                    
                </div>
            </div>

            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                {formType === 'login' ?
                    <LoginForm /> :
                    <SignupForm />
                }
            </Modal>
        </> 
    );
}


