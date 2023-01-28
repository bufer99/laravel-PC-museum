import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Layout({ children, user }) {

    const [burgerMenu, setBurgerMenu] = useState(false);

    const toggleBurger = () => {
        setBurgerMenu(!burgerMenu);
    }

    useEffect(() => {
       setBurgerMenu(false);
    },[])

    return (
        <div className="container mx-auto">
            <div className="sticky top-0">
                <div className="h-fit flex justify-start p-2 bg-sky-500 sticky justify-between items-center">
                    <Link className='font-bold' href={route('items.index')}>PCM</Link>
                    {user &&
                        <div className="flex gap-2 ml-5">
                            <span>Bejelentkezve: </span>
                            <span>{user.name.split(' ')[0]}</span>
                        </div>}
                    <span onClick={toggleBurger} className='flex md:hidden'>
                        <div className='flex flex-col gap-2'>
                            <div className='border-[2px] border-black w-[40px]'></div>
                            <div className='border-[2px] border-black w-[40px]'></div>
                            <div className='border-[2px] border-black w-[40px]'></div>
                        </div>
                    </span>
                    <div className={`flex flex-col absolute top-[100%] right-0 w-min bg-sky-500 p-2 gap-3 ${burgerMenu ? 'flex' : 'hidden'} md:flex md:justify-end md:w-full md:gap-5 md:flex-row md:static`}>
                        {user ? user.is_admin ?
                            <>
                                <Link className='hover:underline' href={route('labels.create')}>
                                    Új címke
                                </Link>
                                <Link className='hover:underline' href={route('items.create')}>
                                    Új tárgy
                                </Link>
                                <Link className='hover:underline' href={route('labels.index')}>
                                    Címkék módosítása
                                </Link>
                                <Link className='hover:underline' href={route('logout')} method="post" as='button'>
                                    Kijelentkezés
                                </Link>
                            </> : <Link className='hover:underline' href={route('logout')} method="post" as='button'>
                                Kijelentkezés
                            </Link> : <Link className='hover:underline' href={route('login')}>
                            Bejelentkezés
                        </Link>
                        }
                    </div>
                </div>
            </div>
            <div className='h-4/5 px-1.5'>
                {children}
            </div>
        </div>
    );
}
