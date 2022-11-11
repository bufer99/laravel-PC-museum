import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { Link, Head } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/Layout';
import { usePage } from '@inertiajs/inertia-react'
import { HexColorPicker } from "react-colorful";

export default function Edit(props) {
    const { errors, flash } = usePage().props
    const { id, name, display, color } = props.label;

    const initState = {
        name: name,
        display: display === 1,
        color: color,
    }

    const [values, setValues] = useState(initState)

    useEffect(() => {
        if (errors.length !== 0) {
            setValues((prevState) => ({
                ...prevState,
                name: errors.name ? '' : prevState.name,
                color: errors.color ? '' : prevState.color
            }))
        }
    }, [errors])

    const handleRadioChange = (e) => {
        const b = e.target.value === 'true'
        setValues(values => ({
            ...values,
            [e.target.id]: b,
        }))
    }

    const handleChange = (e) => {
        setValues(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }
    console.log(values, initState)
    const submit = (e) => {
        e.preventDefault()
        Inertia.put(`/labels/${id}`, values)
    }

    const destroy = (e) => {
        e.preventDefault()
        Inertia.delete(`/labels/${id}`, props.label)
    }

    const setColor = (e) => {
        setValues(values => ({
            ...values,
            ['color']: e,
        }))
    }

    return (
        <Layout user={props.auth.user}>
            <form className='flex gap-10 flex-col w-full min-w-160px max-w-screen-sm mx-auto sm:w-1/2' onSubmit={submit} /*method="POST"*/>
                <label className="flex flex-col">
                    <span className='font-bold'>Címke neve:</span>
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
                    <span className="font-bold">Legyen látható?</span>
                    <div className='flex flex-col items-center gap-0 xs:flex-row xs:gap-10'>
                        <label>
                            Igen
                            <input
                                className='ml-1'
                                type="radio"
                                value={true}
                                name="true"
                                id='display'
                                onChange={handleRadioChange}
                                checked={values.display === true}
                            />
                        </label>
                        <label>
                            Nem
                            <input
                                className='ml-1'
                                type="radio"
                                value={false}
                                name="false"
                                id='display'
                                onChange={handleRadioChange}
                                checked={values.display === false}
                            />
                        </label>
                    </div>
                </div>
                <label className="flex flex-col gap-5">
                    <span className='font-bold'>Színe:</span>
                    <div className="flex flex-col justify-center items-center gap-5 xs:flex-row">
                        <HexColorPicker color={values.color} onChange={setColor} />
                        <div className="w-40 h-40" style={{ backgroundColor: values.color }}></div>
                    </div>
                    <input
                        className={errors.color ? `placeholder-red-500` : null}
                        id="color"
                        type="text"
                        value={values.color}
                        onChange={handleChange}
                        placeholder={errors.color}
                    />
                </label>

                <div className="flex justify-around">
                    <span className='bg-green-500 w-fit mx-auto p-2 font-bold rounded'>
                        <button type="submit">
                            MENTÉS
                        </button>
                    </span>
                    <span className={`w-fit mx-auto p-2 font-bold rounded ${JSON.stringify(values) !== JSON.stringify(initState) ? 'bg-gray-400' : 'bg-red-500'}`}>
                        <button className='border-10 border-black-200' onClick={destroy} disabled={JSON.stringify(values) !== JSON.stringify(initState)}>
                            TÖRLÉS
                        </button>
                    </span>
                </div>
            </form>
        </Layout>
    );
}
