import React from "react";
import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={s.sidebar}>
            <div>
                <NavLink to ='/profile' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Profile</NavLink>
            </div>
            <div>
                <NavLink to ='/dialogs' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Dialogs</NavLink>
            </div>
            <div>
                <NavLink to ='/news' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>News</NavLink>
            </div>
            <div>
                <NavLink to ='/music' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Music</NavLink>
            </div>
            <div>
                <NavLink to ='/settings' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Settings</NavLink>
            </div>
            <div>
                <NavLink to ='/users' className = { sidebarData => sidebarData.isActive ? s.activeLink : s.link }>Users</NavLink>
            </div>
        </div>
    )
}

export default Sidebar