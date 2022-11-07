import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children, user }) {
    console.log(user)
    return (
        <div className="h-screen container mx-auto">
            <div className="h-fit flex justify-start p-2 bg-red-300">
                <Link href={route('items.index')}>PCM</Link>
                <div className="flex justify-end w-full gap-2">
                    {user ? user.is_admin ?
                        <>
                            <Link href={route('labels.create')}>
                                Új címke
                            </Link>
                            <Link href={route('items.create')}>
                                Új tárgy
                            </Link>
                            <Link href={route('labels.index')}>
                                Címkék módosítása
                            </Link>
                            <Link href={route('logout')} method="post">
                                logout
                            </Link>
                        </> : <Link href={route('logout')} method="post">
                            logout
                        </Link> : <Link href={route('login')}>
                        Login
                    </Link>
                    }
                </div>
            </div>
            <div className='h-4/5'>
                {children}
            </div>
        </div>
    );
}
