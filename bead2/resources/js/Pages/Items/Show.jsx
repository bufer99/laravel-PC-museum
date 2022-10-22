import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';

import Item from '@/Components/Item';
import Pagination from '@/Components/Pagination';

export default function Welcome(props) {
    const { item, labels, comments } = props;
    console.log(item)
    console.log(comments)
    {/*postot összehúzni*/ }
    return (
        <Guest>
            <div className='flex flex-col max-w-screen-md mx-auto items-center gap-2 mt-5'>
                <div className='w-full uppercase font-bold'>
                    <div>{item.name}</div>
                </div>
                <div><img src={item.image}></img></div>
                <div className='flex flex-wrap gap-2 w-full'>
                    {labels.filter(e => e.display).map(e => (
                        <div key={e.name} style={{ background: `${e.color}` }} className='rounded px-2 py-1'>
                            {e.name}
                        </div>
                    ))}
                </div>
                <div>{item.description}</div>

            </div>
            {/*<Comments></Comments>*/}
        </Guest>
    );
}
