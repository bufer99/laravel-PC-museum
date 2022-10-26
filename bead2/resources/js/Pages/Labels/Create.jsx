import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { Link, Head } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'

export default function Create() {
    const { errors } = usePage().props

    const [values, setValues] = useState({
        name: null,
        display: null,
        color: null,
    })




    const handleChange = (e) => {
        console.log(e)
        setValues(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(values)
        Inertia.post('/labels', values)
        console.log(errors)
        //route('labels.store')
    }

    return (
        <Guest>
            <form onSubmit={submit} /*method="POST"*/>
                <input id="name" type="text" value={values.name} onChange={handleChange} />
                <input type="radio" value="true" name="display" /> True
                <input type="radio" value="false" name="display" /> Hamis
                <input id="color" type="text" value={values.color} onChange={handleChange} />
                <button type="submit" disabled={false}>CREATE</button>
                <div>{errors.name}</div>
                <div>{errors.display}</div>
                <div>{errors.color}</div>
            </form>
        </Guest>
    );
}
