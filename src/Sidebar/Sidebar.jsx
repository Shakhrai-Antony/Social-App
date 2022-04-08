import React from "react";
import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import {Menu} from "antd";
import 'antd/dist/antd.css'

const Sidebar = () => {
    return (
        <div className={s.sidebar}>
            <Menu className={s.menu} theme="dark" mode="inline">
                <Menu.Item key="1">
                    <NavLink to ='/profile' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Profile</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to ='/dialogs' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Dialogs</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to ='/users' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Users</NavLink>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Sidebar