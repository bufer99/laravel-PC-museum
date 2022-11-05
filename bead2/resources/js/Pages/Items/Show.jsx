import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';
import placeHolder from '../../../../public/images/placeholder.png'
import Item from '@/Pages/Items/Item';
import Pagination from '@/Components/Pagination';
import Comment from './Comment';
import { useState } from 'react';
import { isColorDark } from "is-color-dark";


export default function Show(props) {
    const { item, labels, comments } = props;
    const [activeComment, setActiveComment] = useState(null)


    {/*postot összehúzni*/ }
    return (
        <Guest>
            <div className='flex flex-col max-w-screen-md mx-auto items-center gap-2 mt-5'>
                <div className='flex justify-between w-full uppercase font-bold'>
                    <div>{item.name}</div>
                    <Link href={route('items.edit', item)}>
                        SZERKESZT
                    </Link>
                </div>
                <div><img src={item.image ? `${window.location.origin}/storage/${item.image}` : placeHolder}></img></div>
                <div className='flex flex-wrap gap-2 w-full'>
                    {labels.filter(e => e.display).map(e => (
                        <div key={e.name} style={{ background: `${e.color}`, color: isColorDark(e.color) ? 'white' : 'black' }} className='rounded px-2 py-1'>
                            <Link href={route('items.label', e)}>
                                {e.name}
                            </Link>
                        </div>
                    ))}
                </div>
                <div>{item.description}</div>

            </div>
            {/**MARGIN SET FOR DEV */}
            <div className='max-w-screen-md mx-auto mb-60'>
                <div className="border-b-2 font-bold">{comments.length} Comments </div>
                <div className='flex flex-col gap-3'>
                    {comments.map(e => (
                        <Comment key={e.id} data={e} SetActive={setActiveComment} active={activeComment === e.id} />
                    ))}
                </div>
            </div>
        </Guest>
    );
}
