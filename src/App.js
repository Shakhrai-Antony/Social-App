import s from './App.module.css'
import React, {useEffect} from 'react'
import Sidebar from "./Sidebar/Sidebar";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import ProfileContainer from "./Profile/ProfileContainer";
import {LoginContainer} from "./Login/Login";
import {connect} from "react-redux";
import {initializedSuccess} from "./Store/appReducer";
import Preloader from "./common/preloader/Peloader";
import {UsersContainer} from "./Users/usersContainer";
import {LoginDialogsRedirect} from "./Dialogs/Dialogs";
import {Header} from "./Header/Header";


const App = (props) => {
        useEffect(() => {
            props.initializedSuccess()
        })
        if (!props.initialized)
            return <Preloader/>
        return (
            <BrowserRouter>
                <div className={s.appWrapper}>
                    <Header/>
                    <Sidebar/>
                    <div className={s.appWrapperContent}>
                        <Routes>
                            <Route path='Profile' element={<ProfileContainer/>}/>
                            <Route path='Profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/Dialogs/*' element={<LoginDialogsRedirect/>}/>
                            <Route path='/Users' element={<UsersContainer/>}/>
                            <Route path='/login' element={<LoginContainer/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        )
    }

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, {initializedSuccess})(App)





