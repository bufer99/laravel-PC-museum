import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';
import { usePage } from '@inertiajs/inertia-react'
import { HexColorPicker } from "react-colorful";

export default function Create(props) {
    const { errors, flash } = usePage().props
    const { labels } = props;

    const [values, setValues] = useState({
        name: null,
        description: null,
        image: null
    })

    const [formLabels, setFormLabels] = useState([]);

    const handleCheckBoxChange = (e) => {
        console.log(e.target)
        if (formLabels.includes(Number.parseInt(e.target.id))) setFormLabels(formLabels.filter(id => id !== Number.parseInt(e.target.id)))
        else setFormLabels([...formLabels, Number.parseInt(e.target.id)])
    }

    useEffect(() => {
        console.log(formLabels)
    }, [formLabels])

    const handleChange = (e) => {
        console.log(errors[e.target.id])

        setValues(values => ({
            ...values,
            [labels]: e.target.value,
        }))

        console.log(values)
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(values)
        Inertia.post('/labels', values, {
            onSuccess: () => {
                setValues({
                    name: null,
                    display: false,
                    color: '#fffffff',
                })
            },
            preserveState: false
            //route('labels.store')
        })
    }

    return (
        <Guest>
            <form className='flex gap-10 flex-col w-full min-w-160px max-w-screen-sm mx-auto sm:w-1/2' onSubmit={submit} /*method="POST"*/>
                <label className="flex flex-col">
                    <span>Tárgy neve:</span>
                    <input
                        className={errors.name ? `placeholder-red-500` : null}
                        id="name"
                        type="text"
                        value={values.name}
                        placeholder={errors.name}
                        onChange={handleChange}
                    />
                </label>
                <div>
                    Címkék:
                    <div className='flex flex-col items-center gap-0 xs:flex-row xs:gap-10'>
                        <div className='flex flex-wrap gap-2'>
                            {labels.map(e => (
                                <label className='flex items-center gap-3'>
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
                                        style={{ background: `${e.color}` }}
                                        onClick={() => console.log(e.name)}
                                    >
                                        {e.name}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <label className="flex flex-col gap-5">
                    <span>Leírás</span>
                    <textarea
                        className={errors.name ? `placeholder-red-500` : null}
                        id="description"
                        value={values.description}
                        placeholder={errors.name}
                        onChange={handleChange}
                    />
                </label>

                <button className='border-10 border-black-200' type="submit" disabled={false}>KÉSZ</button>
            </form>
        </Guest>
    );
}