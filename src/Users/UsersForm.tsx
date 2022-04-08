import React from "react";
import {FormikProvider, useFormik} from "formik";
import s from './usersForm.module.css'
import {Button} from "antd";
import {Input, Select} from "formik-antd";

const {Option} = Select;

const UsersForm = React.memo((props: any) => {
        const formik = useFormik({
            initialValues: {
                term: '',
                friendStatus: 'undefined'
            },
            onSubmit: (values) => {
                props.onFilterChanged(values.term, values.friendStatus)
            },
        })
        return (
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.usersForm}>
                        <Select  name="friendStatus" value={formik.values.friendStatus} style={{width: 120}} onChange={formik.handleChange}>
                            <Option  value="undefined">All</Option>
                            <Option value='false'>Unfollowed</Option>
                            <Option value='true'>Followed</Option>
                        </Select>
                        <Input style={{width: 140}} type='term' name='term' value={formik.values.term}
                               onChange={formik.handleChange}/>
                        <Button htmlType="submit">Find</Button>
                    </div>
                </form>
            </FormikProvider>
        )
    }
)

export default UsersForm
