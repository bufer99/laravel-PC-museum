import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';

import { Inertia } from '@inertiajs/inertia';

import Item from '@/Pages/Items/Item';
import Pagination from '@/Components/Pagination';

export default function Comment({ data, SetActive, active, auth }) {

    const { text, id, user } = data;
    const [commentContent, setCommentContent] = useState(text);
    const [editComment, setEditComment] = useState(false);

    const submit = (e) => {
        console.log(e);
        e.preventDefault();
        Inertia.put(`/comments/${id}`, { text: commentContent });
        setEditComment(false);
    }

    return (
        <div className=''>
            <div className='flex justify-between'>
                <span className='font-bold'>{user.name}</span>
                {(auth.user?.is_admin || auth.user?.id === user.id) && <div className='relative'>
                    <span className='hover:font-bold cursor-pointer' onClick={() => SetActive((prevState) => prevState === id ? null : id)}>. . .</span>
                    {active && <div className="flex flex-col absolute bg-white top-100 right-0 p-3 border-2 border-black-100 rounded z-20">
                        <div onClick={() => Inertia.delete(`/comments/${id}`, data)} className='hover:font-bold cursor-pointer'>TÖRÖL</div>
                        <div onClick={() => {
                            setEditComment(!editComment);
                            SetActive(null);
                        }} className='hover:font-bold cursor-pointer'>SZERKESZT</div>
                    </div>}
                </div>}
            </div>

            {editComment ?
                <div>
                    <textarea className='w-full' value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></textarea>
                    <form className="flex gap-5">
                        <button
                            type='submit'
                            onClick={submit}>Mentés</button>
                        <button type='button' onClick={() => setEditComment(false)} >Mégse</button>
                    </form>
                </div>
                :
                <div>{text}</div>
            }
        </div >
    );
}
