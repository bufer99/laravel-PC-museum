import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';

import Item from '@/Pages/Items/Item';
import Pagination from '@/Components/Pagination';

export default function Comment({ data, SetActive, active, auth }) {

    const { text, id, user } = data;

    return (
        <div className=''>
            <div className='flex justify-between'>
                <span className='font-bold'>{user.name}</span>
                {(auth.user.is_admin || auth.user.id === user.id) && <div className='relative'>
                    <span className='hover:font-bold cursor-pointer' onClick={() => SetActive((prevState) => prevState === id ? null : id)}>. . .</span>
                    <div style={{ display: active ? 'block' : 'none' }} className="flex flex-col absolute bg-white top-100 right-0 p-3 border-2 border-black-100 rounded z-20">
                        <div className='hover:font-bold cursor-pointer'>TÖRÖL</div>
                        <div className='hover:font-bold cursor-pointer'>SZERKESZT</div>
                    </div>
                </div>}
            </div>
            <div>{text}</div>
        </div>
    );
}
