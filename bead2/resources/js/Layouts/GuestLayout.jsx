import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="h-screen container mx-auto">
            <div className="h-1/5 flex justify-start p-2 bg-red-300">
                <Link href={route('items.index')}>PCM</Link>
                <div className="flex justify-end w-full gap-2">
                    <Link href={route('labels.create')}>
                        Új címke
                    </Link>
                    <Link href={route('items.create')}>
                        Új tárgy
                    </Link>
                    <Link href={route('labels.index')}>
                        Címkék módosítása
                    </Link>
                </div>
            </div>
            <div className='h-4/5'>
                {children}
            </div>
        </div>
    );
}
