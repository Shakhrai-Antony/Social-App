import React from "react";
import {Field, FormikProvider, useFormik} from "formik";
import s from './usersForm.module.css'

const UsersForm = React.memo((props: any) => {
    const formik = useFormik({
        initialValues: {
            term: '',
            friendStatus: null,
        },
        onSubmit: (values) => {
            props.onFilterChanged(values.term, values.friendStatus)
        }
    })
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.usersForm}>
                    <Field as="select" name="friendStatus" value={formik.values.friendStatus}>
                        <option value="null">All</option>
                        <option value="false">Unfollowed</option>
                        <option value="true">Followed</option>
                    </Field>
                    <input type='term' name='term' value={formik.values.term} onChange={formik.handleChange}/>
                    <button type='submit'>find</button>
                </div>
            </form>
        </FormikProvider>

    )
}
)
export default UsersForm
