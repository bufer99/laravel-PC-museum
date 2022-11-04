import React from 'react';
import placeholder from '../../../../public/images/placeholder.png';
import { Link } from '@inertiajs/inertia-react';

export default function Item({ item }) {
    console.log(item)
    const {name, image , obtained, description, id} = item;
    console.log(window.location.origin)
    return (
        <div className="border-t">
            <div className='font-bold'>{name}</div>
            <img className='h-96' src={image ? `${window.location.origin}/storage/${image}` : placeholder}></img>
            <div>{description.slice(0, 30)}...</div>
            <div className="w-fit rounded-lg bg-sky-500">
                <Link className="p-10" href={route('items.show',item)}>
                    Tovább
                </Link>
            </div>
        </div>
    );
}
