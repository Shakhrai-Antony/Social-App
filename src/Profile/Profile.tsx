import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./MyPosts/MyPosts";

type profileType = {
    isOwner: boolean
}

const Profile: React.FC<profileType> = (props: any) => {
    return (
        <div className={s.profile}>
            <ProfileInfo isOwner={props.isOwner} />
            <MyPosts/>
        </div>
    )
}

export default Profile