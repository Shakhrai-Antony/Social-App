import React, {useEffect} from "react";
import s from './login.module.css'
import * as Yup from 'yup'
import {connect} from "react-redux";
import {getCaptchaSuccessThunkCreator, setLogInUserThunkCreator} from "../Store/authReducer";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {appStateType} from "../Store/reduxStore";

export const Login = (props: any) => {

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
            props.onSubmit(email, password, rememberMe, captchaValue)
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
            {props.captcha && <img src={props.captcha}/>}
            <div>
                <input placeholder={'captchaValue'} name={'captchaValue'} onChange={handleChange}/>
            </div>
        </form>
    )
}

const LoginForm: React.FC<loginFormType> = (props) => {
    useEffect(() => {
        props.getCaptchaSuccessThunkCreator()
    })
    let onSubmit = (email: string, password: string, rememberMe: boolean | string, captchaValue: string) => {
        props.setLogInUserThunkCreator(email, password, rememberMe, captchaValue)
    }
    return (
        <Login {...props} onSubmit={onSubmit}/>
    )
}

type loginFormType = {
    setLogInUserThunkCreator: (email: string, password: string, rememberMe: boolean | string, captchaValue: string) => void
    getCaptchaSuccessThunkCreator: () => void
}

const loginUsersRedirect: React.FC<propsType> = (props) => {
    let navigate = useNavigate()
    useEffect(() => {
        if (props.isAuth) {
            return navigate('/Profile')
        }
    })
    return <LoginForm {...props} />
}

type propsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    isAuth: boolean,
    captcha: string | null
}

type mapDispatchToPropsType = {
    setLogInUserThunkCreator: (email: string, password: string, rememberMe: boolean | string, captchaValue: string) => void
    getCaptchaSuccessThunkCreator: () => void
}

let mapStateToProps = (state: appStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export const LoginContainer = connect<mapStateToPropsType, mapDispatchToPropsType, appStateType>
    // @ts-ignore
    (mapStateToProps, {setLogInUserThunkCreator, getCaptchaSuccessThunkCreator})
    (loginUsersRedirect)
