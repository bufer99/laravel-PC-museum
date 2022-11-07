import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';
import { isColorDark } from "is-color-dark";

export default function Index(props) {

    const { labels } = props;

    return (
        <Guest user={props.auth.user}>
            <div className="flex justify-center items-center mt-40">
                <div className='flex flex-wrap gap-2 w-full overflow-y-scroll w-1/2'>
                    {labels.map(e => (
                        <Link href={route('labels.edit', e)}>
                            <div key={e.name} style={{ background: `${e.color}`, color: isColorDark(e.color) ? 'white' : 'black' }} className='rounded px-2 py-1'>
                                {e.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Guest>
    );
}
