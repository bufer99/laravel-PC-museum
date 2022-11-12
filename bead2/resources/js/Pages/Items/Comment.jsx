import React, { useState, useEffect } from 'react';

import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

export default function Comment({ data, SetActive, active, auth }) {

    const { text, id, user } = data;
    const { errors, flash } = usePage().props;
    const [commentContent, setCommentContent] = useState(text);
    const [editComment, setEditComment] = useState(false);

    const getDateFormat = (date) => {

        const s = Date.now()-new Date(date).getTime();
        if(s / 60_000 < 60) return `${Math.ceil(s / 60_000)} perccel ezelőtt`;
        if(s / 60_000 > 60 && s / 3_600_000 < 24) return `${Math.ceil(s / 3_600_000)} órával ezelőtt`
        else return (new Date(date).toLocaleString('hu-HU'));
    }

    const submit = (e) => {
        e.preventDefault();
        Inertia.put(`/comments/${id}`, { text: commentContent }, {
            onSuccess: () => setEditComment(false)
        });
    }


    useEffect(() => {
        if (errors.length !== 0) {
            setCommentContent((prevState) => errors.text ? '' : prevState)
        }
    }, [errors])

    return (
        <div className=''>
            <div className='flex justify-between'>
                <span className='font-bold'>{user.name}</span>
                <span className='text-gray-500'>{getDateFormat(data.created_at)}</span>
                {(auth.user?.is_admin || auth.user?.id === user.id) && <div className='relative'>
                    <span className='hover:font-bold cursor-pointer' onClick={() => SetActive((prevState) => prevState === id ? null : id)}>. . .</span>
                    {active && <div className="flex flex-col absolute bg-white top-100 right-0 p-3 border-2 border-black-100 rounded z-20">
                        <div onClick={() =>
                            Inertia.delete(`/comments/${id}`, {
                                onBefore: () => confirm(`Biztos tölri ezt a kommentet?`),
                            })
                        }
                            className='hover:font-bold cursor-pointer'>TÖRÖL</div>
                        <div onClick={() => {
                            setEditComment(!editComment);
                            SetActive(null);
                        }} className='hover:font-bold cursor-pointer'>SZERKESZT</div>
                    </div>}
                </div>}
            </div>

            {editComment ?
                <div>
                    <textarea
                        className={`w-full ${errors.text ? 'placeholder-red-500' : null}`}
                        placeholder={errors.text}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    >
                    </textarea>
                    <form className="flex gap-5" onSubmit={submit}>
                        <button type='submit'>Mentés</button>
                        <button type='button' onClick={() => setEditComment(false)} >Mégse</button>
                    </form>
                </div>
                :
                <div>{text}</div>
            }
        </div >
    );
}
