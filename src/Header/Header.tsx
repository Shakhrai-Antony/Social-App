import React, {useEffect} from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginSelector} from "../Store/loginSelectors";
import {requestIsAuth} from "../Store/usersSelectors";
import {setLogOutUserThunkCreator} from "../Store/authReducer";


export const Header:React.FC = (props) => {
    const login = useSelector(loginSelector)
    const isAuth = useSelector(requestIsAuth)
    const dispatch = useDispatch()
    const onLogOutUser = () => {
        dispatch(setLogOutUserThunkCreator())
    }
    useEffect(() => {
    }, [isAuth])

    return (
        <header className={s.header}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Twitter_Logo.png"/>
            <div className={s.loginBlock}>
                {   isAuth
                    ? <div>{login} - <button onClick={onLogOutUser}>Log out</button></div>
                    : <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    )
}
