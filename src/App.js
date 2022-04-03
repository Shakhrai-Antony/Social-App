import s from './App.module.css'
import React from 'react'
import Sidebar from "./Sidebar/Sidebar";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./Dialogs/dialogsContainer";
import UsersContainer from "./Users/usersContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import HeaderContainer from "./Header/HeaderContainer";
import {LoginContainer} from "./Login/Login";
import {connect} from "react-redux";
import {initializedSuccess} from "./Store/appReducer";
import Preloader from "./common/preloader/Peloader";



class App extends React.Component {

    componentDidMount() {
        this.props.initializedSuccess()
    }

    render () {
        if (!this.props.initialized){
            return <Preloader/>
        };
        return (
            <BrowserRouter>
                <div className={s.appWrapper}>
                    <HeaderContainer/>
                    <Sidebar/>
                    <div className={s.appWrapperContent}>
                        <Routes>
                            <Route path='Profile' element={<ProfileContainer/>}/>
                            <Route path='Profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/Dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/Users' element={<UsersContainer/>}/>
                            <Route path='/login' element={<LoginContainer/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, {initializedSuccess})(App)





