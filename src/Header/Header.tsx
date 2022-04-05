import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginSelector} from "../Store/loginSelectors";
import {requestIsAuth} from "../Store/usersSelectors";
import {setLogOutUserThunkCreator} from "../Store/authReducer";

type headerType = {
    onLogOutUser: () => void
}

export const Header: React.FC<headerType> = (props) => {
    const login = useSelector(loginSelector)
    const isAuth = useSelector(requestIsAuth)
    const dispatch = useDispatch()
    const onLogOutUser = () => {
        dispatch(setLogOutUserThunkCreator)
    }

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
