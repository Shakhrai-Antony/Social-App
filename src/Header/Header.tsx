import React, {useEffect} from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginSelector} from "../Store/loginSelectors";
import {requestIsAuth} from "../Store/usersSelectors";
import {setLogOutUserThunkCreator} from "../Store/authReducer";
import {Col, Row} from "antd";
import { Button} from 'antd'

export const HeaderComponent:React.FC = (props) => {

    const login = useSelector(loginSelector)
    const isAuth = useSelector(requestIsAuth)
    const dispatch = useDispatch()
    const onLogOutUser = () => {
        dispatch(setLogOutUserThunkCreator())
    }
    useEffect(() => {
    }, [isAuth])

    return (
        <Row  >
            <Col span={24}>
                <header className={s.header}>
                    <Col span={24}>
                        <div className={s.loginBlock}>
                            {   isAuth
                                ? <div className={s.login}>
                                    {login} - <Button onClick={onLogOutUser}>Log out</Button>
                                </div>
                                : <NavLink to='/login'>Login</NavLink>
                            }
                        </div>
                    </Col>

                </header>
            </Col>

        </Row>

    )
}
