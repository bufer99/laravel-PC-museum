import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="container mx-auto">
            <div className="flex justify-start p-2 bg-red-300">
                <Link href={route('items.index')}>PCM</Link>
                <div className="flex justify-end w-full gap-2">
                    <Link href={route('labels.create')}>
                        Új címke
                    </Link>
                    <Link href={route('items.create')}>
                        Új tárgy
                    </Link>
                </div>
            </div>
            {children}
        </div>
    );
}
