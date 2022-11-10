import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';
import placeHolder from '../../../../public/images/placeholder.png'
import Item from '@/Pages/Items/Item';
import Pagination from '@/Components/Pagination';
import Comment from './Comment';
import { useState } from 'react';
import { isColorDark } from "is-color-dark";
import { Inertia } from '@inertiajs/inertia';


export default function Show(props) {
    const { item, labels, comments } = props;
    const [activeComment, setActiveComment] = useState(null);
    const [createComment, setCreateComment] = useState(false);
    const [commentContent, setCommentContent] = useState('');

    console.log(createComment &&  props.auth.user)

    {/*postot összehúzni*/ }
    return (
        <Guest user={props.auth.user}>
            <div className='flex flex-col max-w-screen-md mx-auto items-center gap-2 mt-5'>
                <div className='flex justify-between w-full uppercase font-bold'>
                    <div>{item.name}</div>
                    {props.auth?.user?.is_admin === 1 && <Link href={route('items.edit', item)}>
                        SZERKESZT
                    </Link>}
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
                <div className="border-b-2 font-bold flex justify-between">
                    <div>{comments.length} Comments</div>
                    {props.auth.user &&
                        <div
                            onClick={() => setCreateComment(!createComment)}
                            className='hover:underline cursor-pointer'
                        >Kommentelés
                        </div>}
                </div>
                <div className='flex flex-col gap-3'>
                    {!(createComment && props.auth.user) ? '' :
                        <div>
                            <textarea className='w-full' value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></textarea>
                            <form className="flex gap-5">
                                <button type='submit' onClick={() => Inertia.post(`/comments/${item.id}`, { text: commentContent })}>Mentés</button>
                                <button type='button' onClick={() => setCreateComment(false)} >Mégse</button>
                            </form>
                        </div>
                    }
                    {comments.map(e => (
                        <Comment key={e.id} data={e} SetActive={setActiveComment} active={activeComment === e.id} auth={props.auth} />
                    ))}
                </div>
            </div>
        </Guest>
    );
}
