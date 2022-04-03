import React from "react";
// @ts-ignore
import s from './Header.module.css'
import {NavLink} from "react-router-dom";


type headerType = {
    isAuth: boolean
    login: string | null
    setLogOutUserThunkCreator: () => void
}

const Header: React.FC<headerType> = (props) => {

    return (
        <header className={s.header}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Twitter_Logo.png"/>
            <div className={s.loginBlock}>
                {   props.isAuth
                    ? <div>{props.login} - <button onClick={props.setLogOutUserThunkCreator}>Log out</button></div>
                    : <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header