import s from './App.module.css'
import React, {useEffect} from 'react'
import Sidebar from "./Sidebar/Sidebar";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {initializedSuccess} from "./Store/appReducer";
import Preloader from "./common/preloader/Peloader";
import {UsersContainer} from "./Users/usersContainer";
import {LoginDialogsRedirect} from "./Dialogs/Dialogs";
import {Header} from "./Header/Header";
import {LoginRedirect} from "./Login/Login";
import {ProfileURLMatch} from "./Profile/ProfileContainer";
import {setInitializedApp} from "./Store/app.Selectors";


export const App = (props) => {

    const dispatch = useDispatch()
    const initialized = useSelector(setInitializedApp)

    useEffect(() => {
        dispatch(initializedSuccess())
    })
    if (!initialized) {
        return <Preloader/>
    }
    return (
        <BrowserRouter>
            <div className={s.appWrapper}>
                <Header/>
                <Sidebar/>
                <div className={s.appWrapperContent}>
                    <Routes>
                        <Route path='profile' element={<ProfileURLMatch/>}/>
                        <Route path='profile/:userId' element={<ProfileURLMatch/>}/>
                        <Route path='/dialogs/*' element={<LoginDialogsRedirect/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/login' element={<LoginRedirect/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}
