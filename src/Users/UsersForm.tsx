import React from "react";
import {FormikProvider, useFormik} from "formik";
import s from './usersForm.module.css'
import {Button} from "antd";
import {Select} from 'antd';
import {Input} from "formik-antd";

const {Option} = Select;

const UsersForm = React.memo((props: any) => {
        const formik = useFormik({
            initialValues: {
                term: '',
                friendStatus: true,
            },
            onSubmit: (values) => {
                props.onFilterChanged(values.term, values.friendStatus)
            },

        })
    console.log(formik.values.friendStatus)
    console.log(formik.values.term)
        return (
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.usersForm}>
                        <Select value={formik.values.friendStatus} style={{width: 120}}
                                onChange={formik.handleChange}>
                            <Option value="undefined">All</Option>
                            <Option value="false">Unfollowed</Option>
                            <Option value="true">Followed</Option>
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
