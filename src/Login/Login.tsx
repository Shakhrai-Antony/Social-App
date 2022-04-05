import React, {useEffect} from "react";
import s from './login.module.css'
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {getCaptchaSuccessThunkCreator, setLogInUserThunkCreator} from "../Store/authReducer";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {getCaptchaSelector, loginSelector} from "../Store/loginSelectors";

export const Login = (props: any) => {

    const dispatch = useDispatch()
    const captcha = useSelector(getCaptchaSelector)
    useEffect(() => {
        dispatch(getCaptchaSuccessThunkCreator())
    },[])
    const onSubmit = (email: string, password: string, rememberMe: boolean | number, captchaValue: string) => {
        // @ts-ignore
        dispatch(setLogInUserThunkCreator(email, password, rememberMe, captchaValue))
    }

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: 0,
            captchaValue: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().max(30, 'Login should be shorter than 30 characters').required('Required'),
            password: Yup.string().min(6, 'Password should be longer than 6 characters').required('Required')
        }),
        onSubmit: ({email, password, rememberMe, captchaValue}) => {
            onSubmit(email, password, rememberMe, captchaValue)
        }
    })


    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.formControl}>
                <input placeholder='email' name='email' onChange={handleChange}
                       value={values.email} onBlur={handleBlur}/>
                {touched.email && errors.email ?
                    <div className={s.error}>{errors.email}</div> : null}
            </div>
            <div className={s.formControl}>
                <input type={'password'} placeholder='password' name='password' onChange={handleChange}
                       value={values.password} onBlur={handleBlur}/>
                {touched.password && errors.password ?
                    <div className={s.error}>{errors.password}</div> : null}
            </div>
            <div className={s.formControl}>
                <input type='checkbox' name='rememberMe' value={values.rememberMe}/>
                remember Me
            </div>
            <div className={s.formControl}>
                <button type='submit'>Log in</button>
            </div>
            {captcha && <img src={captcha}/>}
            <div>
                <input placeholder={'captchaValue'} name={'captchaValue'} onChange={handleChange}/>
            </div>
        </form>
    )
}

export const LoginRedirect: React.FC = (props) => {
    const isAuth = useSelector(loginSelector)
    let navigate = useNavigate()
    useEffect(() => {
        if (isAuth) {
            return navigate('/profile')
        }
    }, [isAuth])
    return <Login />
}
