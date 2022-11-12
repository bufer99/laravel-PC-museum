import React from 'react';
import Layout from '@/Layouts/Layout';

import Item from '@/Pages/Items/Item';
import Pagination from '@/Components/Pagination';
import { isColorDark } from "is-color-dark";

export default function Welcome(props) {

    const { label } = props;

    return (
        <Layout user={props.auth.user}>
            {label &&
                <span className='flex gap-2 justify-center items-center font-bold my-2'>
                    <span>Tárgyak</span>
                    <span style={{ background: `${label.color}`, color: isColorDark(label.color) ? 'white' : 'black' }} className='rounded px-2 py-1'>
                        {label.name}
                    </span>
                    <span>címkével: {props.items_count}db</span>
                </span>
            }
            <div className="flex items-center flex-col gap-10 mb-8">
                {props.items.data.map(e => (
                    <Item key={e.id} item={e} />
                )
                )}
            </div>
            <div className="mb-8">
                <Pagination data={props.items} />
            </div>
        </Layout>
    );
}
