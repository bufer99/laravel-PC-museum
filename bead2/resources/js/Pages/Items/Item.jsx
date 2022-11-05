import React from 'react';
import placeholder from '../../../../public/images/placeholder.png';
import { Link } from '@inertiajs/inertia-react';

export default function Item({ item }) {
    console.log(item)
    const { name, image, obtained, description, id } = item;
    console.log(window.location.origin)
    return (
        <div className="border-t flex flex-col">
            <div className='font-bold'>{name}</div>
            <img className='w-[600px]' src={image ? `${window.location.origin}/storage/${image}` : placeholder}></img>
            <div className="flex flex-col gap-2 mt-3">
                <div>{description.slice(0, 30)}...</div>
                <div className="w-fit rounded-lg bg-sky-500">
                    <Link className="p-10" href={route('items.show', item)}>
                        Tovább
                    </Link>
                </div>
            </div>
        </div>
    );
}
