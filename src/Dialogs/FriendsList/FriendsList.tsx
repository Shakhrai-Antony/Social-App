import React from "react";
import {NavLink} from "react-router-dom";
import s from "../Dialogs.module.css";

type FriendsListProps = {
    id: number,
    name: string
}

const FriendsList: React.FC<FriendsListProps> = (props) => {
    return (
        <div>
            <NavLink to={'/dialogs/' + props.id} className={ dialogsData => dialogsData.isActive ? s.activeLink : s.link}>{props.name}</NavLink>
        </div>
    )
}

export default FriendsList