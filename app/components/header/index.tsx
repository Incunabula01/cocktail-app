"use client"
import { PageProps } from '@/.next/types/app/page'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Header(props: PageProps) {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    return (
        <>
            <header className="bg-blue-500 py-4 fixed w-full top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    
                    <button className="block lg:hidden px-2 py-1 text-white" onClick={() => setOpenMenu(!openMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>

                   
                    <Link href="/" className="text-white text-xl font-semibold">
                        h1
                    </Link>

                    
                    <nav className="hidden lg:flex space-x-4">
                        <a href="#" className="text-white">Home</a>
                        <a href="#" className="text-white">About</a>
                        <a href="#" className="text-white">Services</a>
                        <a href="#" className="text-white">Contact</a>
                    </nav>
                </div>
            </header>
<div className={`${openMenu ? '-translate-x-full' : ''} bg-blue-500 lg:hidden hidden fixed top-0 left-0 w-1/2 h-full transform transition-transform duration-300 ease-in-out z-40`}>
                <ul className="mt-16 space-y-4 text-center">
                    <li><a href="#" className="block text-white font-semibold">Home</a></li>
                    <li><a href="#" className="block text-white font-semibold">About</a></li>
                    <li><a href="#" className="block text-white font-semibold">Services</a></li>
                    <li><a href="#" className="block text-white font-semibold">Contact</a></li>
                </ul>
            </div>
        </>
    )
}
