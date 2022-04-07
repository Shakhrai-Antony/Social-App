import React from "react";
import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import {Menu} from "antd";
import 'antd/dist/antd.css'


const Sidebar = () => {
    return (
        <div className={s.sidebar}>
            <div>
                <Menu.Item>
                    <NavLink to ='/profile' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Profile</NavLink>
                </Menu.Item>
            </div>
            <div>
                <Menu.Item key="2">
                    <NavLink to ='/dialogs' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Dialogs</NavLink>
                </Menu.Item>
            </div>
            <div>
                <Menu.Item key="3">
                    <NavLink to ='/users' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Users</NavLink>
                </Menu.Item>
            </div>
        </div>
    )
}

export default Sidebar