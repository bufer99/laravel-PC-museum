import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';

import Item from '@/Components/Item';
import Pagination from '@/Components/Pagination';

export default function Welcome(props) {
    console.log(props)
    return (
        <Guest>
            <div className="flex items-center flex-col">
                {props.items.data.map(e => (
                    <Item key={e.id} item={e} />
                    )
                )}
            </div>
            {/**Ezt a Paginationt lehetne route('items.VALAMI, $page)-el mert most mindig ujratolti ??
             * URL paramétereket le kell védeni
            */}
            <Pagination data={props.items}/>
        </Guest>
    );
}