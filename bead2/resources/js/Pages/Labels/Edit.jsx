import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';
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

    console.log(props)
    const [values, setValues] = useState(initState)

    const handleRadioChange = (e) => {
        //console.log(e.target.checked)
        const b = e.target.value === 'true'
        //console.log(b)
        setValues(values => ({
            ...values,
            [e.target.id]: b,
        }))
        console.log(values)
    }

    const handleChange = (e) => {
        console.log(errors[e.target.id])

        setValues(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))

        console.log(values)
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(values)
        Inertia.put(`/labels/${id}`, values)
    }

    const destroy = (e) => {
        e.preventDefault()
        Inertia.delete(`/labels/${id}`, props.label)
    }

    const setColor = (e) => {
        console.log(e)
        setValues(values => ({
            ...values,
            ['color']: e,
        }))
        console.log(values)
    }

    return (
        <Guest>
            <form className='flex gap-10 flex-col w-full min-w-160px max-w-screen-sm mx-auto sm:w-1/2' onSubmit={submit} /*method="POST"*/>
                <label className="flex flex-col">
                    <span>Címke neve:</span>
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
                    Legyen látható?
                    <div className='flex flex-col items-center gap-0 xs:flex-row xs:gap-10'>
                        <label>
                            Igen
                            <input
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
                    <span>Színe:</span>
                    <div className="flex flex-col justify-center items-center gap-5 xs:flex-row">
                        <HexColorPicker color={values.color} onChange={setColor} />
                        <div className="w-40 h-40" style={{ backgroundColor: values.color }}></div>
                    </div>
                    <input
                        id="color"
                        type="text"
                        value={values.color}
                        onChange={handleChange}
                    />
                </label>

                <div className="flex justify-around">
                    <button className='border-10 border-black-200' type="submit" disabled={false}>KÉSZ</button>
                    <button className='border-10 border-black-200' onClick={destroy} disabled={values !== initState}>TÖRÖL</button>
                </div>
            </form>
        </Guest>
    );
}