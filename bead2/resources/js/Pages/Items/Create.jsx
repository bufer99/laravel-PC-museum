import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import Layout from '@/Layouts/Layout';
import { usePage } from '@inertiajs/inertia-react'
import placeholder from '../../../../public/images/placeholder.png';
import { isColorDark } from "is-color-dark";

export default function Create(props) {
    const { errors, flash, csrf_token } = usePage().props

    const { labels } = props;

    const [values, setValues] = useState({
        name: '',
        description: '',
        image: null
    })

    const [formLabels, setFormLabels] = useState([]);

    const handleCheckBoxChange = (e) => {
        if (formLabels.includes(Number.parseInt(e.target.id))) setFormLabels(formLabels.filter(id => id !== Number.parseInt(e.target.id)))
        else setFormLabels([...formLabels, Number.parseInt(e.target.id)])
    }

    useEffect(() => {
        if (errors.length !== 0) {
            setValues((prevState) => ({
                name: errors.name ? '' : prevState.name,
                description: errors.description ? '' : prevState.description,
                image: errors.image ? null : prevState.image,
            }))
        }
    }, [errors])

    const handleChange = (e) => {
        setValues(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()
        Inertia.post('/items', { ...values, formLabels }, {
            forceFormData: true,
        })
    }

    return (
        <Layout user={props.auth.user}>
            <form className='flex mb-10 gap-10 flex-col w-full min-w-160px max-w-screen-sm mx-auto sm:w-1/2' onSubmit={submit} /*method="POST"*/>
                <label className="flex flex-col">
                    <span className='font-bold'>Tárgy neve:</span>
                    <input
                        className={errors.name ? `placeholder-red-500` : null}
                        id="name"
                        type="text"
                        value={values.name}
                        placeholder={errors.name}
                        onChange={handleChange}
                    />
                </label>
                <label className="flex flex-col">
                    <span className='font-bold'>Leírás:</span>
                    <textarea
                        className={errors.description ? `placeholder-red-500` : null}
                        id="description"
                        value={values.description}
                        placeholder={errors.description}
                        onChange={handleChange}
                    />
                </label>
                <div>
                    <span className='font-bold'>Címkék:</span>
                    <div className='flex flex-col items-center gap-0 xs:flex-row xs:gap-10'>
                        <div className='flex flex-wrap gap-2'>
                            {labels.map(e => (
                                <label key={e.id} className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                        value={e.id}
                                        name={e.id}
                                        id={e.id}
                                        onChange={handleCheckBoxChange}
                                        checked={formLabels.includes(e.id)}
                                    />
                                    <div
                                        className='rounded px-2 py-1'
                                        key={e.name}
                                        style={{ background: `${e.color}`, color: isColorDark(e.color) ? 'white' : 'black' }}
                                    >
                                        {e.name}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <input type="file" onChange={e => setValues(values => ({ ...values, image: e.target.files[0] }))} />
                <img src={values.image ? URL.createObjectURL(values.image) : placeholder} />


                <span className='bg-green-500 w-fit mx-auto p-2 font-bold rounded'>
                    <button type="submit">
                        MENTÉS
                    </button>
                </span>

            </form>
        </Layout>
    );
}
