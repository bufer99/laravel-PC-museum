import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Layout({ children, user }) {

    const [burgerMenu, setBurgetMenu] = useState(false);

    const toggleBurger = () => {
        useState(!burgerMenu);
    }

    return (
        <div className="container mx-auto">
            <div className="sticky top-0">
                <div className="h-fit flex justify-start p-2 bg-red-300 sticky justify-between items-center">
                    <Link className='font-bold' href={route('items.index')}>PCM</Link>
                    {user &&
                        <div className="flex gap-2 ml-5">
                            <span>Bejelentkezve: </span>
                            <span>{user.name.split(' ')[0]}</span>
                        </div>}
                    <span className='flex md:hidden'>
                        <div className='flex flex-col gap-2'>
                            <div className='border-[2px] border-black w-[40px]'></div>
                            <div className='border-[2px] border-black w-[40px]'></div>
                            <div className='border-[2px] border-black w-[40px]'></div>
                        </div>
                    </span>
                    <div className="hidden md:flex justify-end w-full gap-5">
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
            <div className='h-4/5'>
                {children}
            </div>
        </div>
    );
}
