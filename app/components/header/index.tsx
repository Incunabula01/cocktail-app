"use client"
import { PageProps } from '@/.next/types/app/page';
import Link from 'next/link';
import React, { useState } from 'react';
import { LiaGlassMartiniAltSolid } from 'react-icons/lia';
import { SlHome, SlUser, SlHeart, SlMenu } from 'react-icons/sl';

const navItems = [{
    label: 'Home',
    link: '/',
    icon: <SlHome size="20" />
}, 
{
    label: 'Favorites',
    link: '/favorites',
    icon: <SlHeart size="20" />
},
{
    label: 'Profile',
    link: '/profile',
    icon: <SlUser size="20" />
},
]

export default function Header(props: PageProps) {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <>
            <header className="bg-teal-50 py-4 fixed w-full top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">

                    <button className="block lg:hidden px-2 py-1 text-rose-800" onClick={() => setOpenMenu(!openMenu)}>
                        <SlMenu size="30"/>
                    </button>

                    <div className="items-center w-full justify-items-center flex lg:justify-items-start">
                        <Link href="/" className="text-rose-800 text-xl font-semibold flex flex-row gap-1">
                            <LiaGlassMartiniAltSolid size="30" />
                            <h1 className='text-2xl'>Cocktail Finder</h1>
                        </Link>
                    </div>
                   
                    <nav className="hidden lg:flex space-x-4">
                        {navItems.map((el, idx) => (
                            <Link href={el.link} key={`${el.label}-${idx}`} className="text-rose-800 flex flex-row gap-2 hover:text-rose-950">
                                {el.icon} {el.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
            <div className={`bg-rose-950 lg:hidden fixed top-[70px] left-0 w-1/2 h-full transform transition-transform ${!openMenu ? '-translate-x-full' : ''} duration-300 ease-in-out z-[900]`}>
                <ul className="text-center mt-4">
                    {navItems.map((el, idx) => (
                        <li key={`${el.label}-${idx * 10}`}>
                            <Link href={el.link}  className="text-white flex flex-row gap-2 py-5 px-4 focus:bg-black" onClick={() => setOpenMenu(!openMenu)}>
                                {el.icon}
                                <p>{el.label}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
