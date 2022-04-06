import React from "react";
import s from './Profile.module.css'
import MyPostsContainer from "./MyPosts/myPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type profileType = {
    isOwner: boolean
}

const Profile: React.FC<profileType> = (props: any) => {
    return (
        <div className={s.profile}>
            <ProfileInfo isOwner={props.isOwner} />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile