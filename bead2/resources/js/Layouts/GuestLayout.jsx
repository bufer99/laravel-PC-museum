import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children, user }) {
    console.log(user)
    return (
        <div className="container mx-auto">
            <div className="sticky top-0">
                <div className="h-fit flex justify-start p-2 bg-red-300 sticky">
                    <Link href={route('items.index')}>PCM</Link>
                    <div className="flex justify-end w-full gap-5">
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
