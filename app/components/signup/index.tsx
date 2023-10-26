"use client";
import React from 'react';
import { UserAccount } from '@/utils/types';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { signUpSchema } from '@/utils';
import { registerUser } from '@/app/api/signup';
import { useDispatch } from 'react-redux';
import { logIn } from '@/store/authReducer';
import { useRouter, usePathname } from 'next/navigation';
import { showToast } from '@/store/notificationReducer';

const SignupForm = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const router = useRouter();
    const pathname = usePathname();

    const redirectUrl = pathname === '/favorites' ? '/favorites' : '/';

    const handleRegistration = async (data: FieldValues) => {
        const fieldData = data as UserAccount;
        const response = await registerUser(fieldData);

        if(response) {
            if (response.hasOwnProperty('userName')) {
                const { userName } = response;

                localStorage.setItem('userName', userName);
                dispatch(logIn({ isLoggedIn: true, user: userName }));
                dispatch(showToast({ message: 'Successfully created new account!', type: 'success' }));
                router.push(redirectUrl);
            } else {
                dispatch(showToast({ message: `Error: ${response.error}`, type: 'error' }));
            }
        } else {
            dispatch(showToast({ message: `Unexpected error, please try again.`, type: 'error' }));
        }
        
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit(handleRegistration)} className="bg-white px-8 pt-6 pb-8">
                <h1 className='text-rose-700 text-semibold text-3xl'>Sign Up</h1>
                <hr className='my-2' />
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        {...register('name')}
                    />
                    {errors.name && <p className='text-red-600 font-semibold'>{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        {...register('email')}
                    />
                    {errors.email && <p className='text-red-600 font-semibold'>{errors.email.message}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                    {errors.password && <p className='text-red-600 font-semibold'>{errors.password.message}</p>}
                </div>
                <div className="flex gap-2">
                    <button
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
                        type="submit" name='signup'
                    >
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
