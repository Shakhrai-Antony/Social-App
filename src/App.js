import React, {useEffect} from 'react'
import Sidebar from "./Sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {initializedSuccess} from "./Store/appReducer";
import Preloader from "./common/preloader/Peloader";
import {UsersContainer} from "./Users/usersContainer";
import {LoginDialogsRedirect} from "./Dialogs/Dialogs";
import {HeaderComponent} from "./Header/Header";
import {LoginRedirect} from "./Login/Login";
import {ProfileURLMatch} from "./Profile/ProfileContainer";
import {setInitializedApp} from "./Store/app.Selectors";
import 'antd/dist/antd.css'
import {Layout} from 'antd';

const {Header, Content, Sider} = Layout;

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
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <Sidebar/>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{padding: 0}}>
                    <HeaderComponent/>
                </Header>
                <Content style={{margin: '24px 16px 0'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Routes>
                            <Route path='profile' element={<ProfileURLMatch/>}/>
                            <Route path='profile/:userId' element={<ProfileURLMatch/>}/>
                            <Route path='/dialogs' element={<LoginDialogsRedirect/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/login' element={<LoginRedirect/>}/>
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}