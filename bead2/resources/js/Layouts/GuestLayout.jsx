import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="container mx-auto">
            <div className="flex justify-start p-2 bg-red-300">
                <Link href='/'>PCM</Link>
                <div className="flex justify-end w-full gap-2">
                    <div>Új címke</div>
                    <div>Új Tárgy</div>
                </div>
            </div>
            {children}
        </div>
    );
}
