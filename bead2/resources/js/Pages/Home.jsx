import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';

import Item from '@/Pages/Items/Item';
import Pagination from '@/Components/Pagination';

export default function Welcome(props) {
    console.log(props)
    return (
        <Guest user={props.auth.user}>
            {props.label && `Postok a ${props.label.name} címkével`}
            <div className="flex items-center flex-col gap-10 mb-8">
                {props.items.data.map(e => (
                    <Item key={e.id} item={e} />
                )
                )}
            </div>
            <div className="mb-8">
                <Pagination data={props.items} />
            </div>
        </Guest>
    );
}
