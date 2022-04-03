import React from "react";
import {Field, FormikProvider, useFormik} from "formik";
import s from './usersForm.module.css'

const UsersForm = (props: any) => {
    const formik = useFormik({
        initialValues: {
            term: '',
            friend: null
        },
        onSubmit: (values) => {
            props.onFilterChanged(values.term, values.friend)
        }
    })
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <Field as="select" name="friend">
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                </Field>
                <div className={s.usersForm}>
                    <input type='term' name='term' value={formik.values.term} onChange={formik.handleChange}/>
                    <button type='submit'>find</button>
                </div>
            </form>
        </FormikProvider>

    )
}

export default UsersForm
