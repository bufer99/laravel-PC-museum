import React from 'react';
import placeholder from '../../../../public/images/placeholder.png';
import { Link } from '@inertiajs/inertia-react';

export default function Item({ item }) {
    const { name, image, obtained, description, id } = item;
    return (
        <div className="border-t flex flex-col">
            <div className='font-bold text-xl my-3'>{name}</div>
            <img className='w-[600px]' src={image ? `${window.location.origin}/storage/${image}` : placeholder}></img>
            <div className="flex flex-col gap-2 mt-3">
                <div>{description.slice(0, 30)}...</div>
                <div className="w-fit rounded-lg bg-sky-500 py-1">
                    <Link className="px-10 " href={route('items.show', item)}>
                        Tovább
                    </Link>
                </div>
            </div>
        </div>
    );
}
