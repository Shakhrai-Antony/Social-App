import React from "react";
// @ts-ignore
import s from './Profile.module.css'
import MyPostsContainer from "./MyPosts/myPostsContainer";
import {messagesType, profileType} from "../Store/profileReducer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


type profileTypes = {
    profile: profileType
    status: string
    isOwner:boolean
    setNewStatusThunkCreator: (status: string) => void
    setNewPhotoThunkCreator: (photo: File) => void
}

const Profile = (props: any) => {

    return (
        <div className={s.profile}>
            <ProfileInfo profile={props.profile} status={props.status}
                         setNewStatusThunkCreator={props.setNewStatusThunkCreator}
                         isOwner={props.isOwner}
                         setNewPhotoThunkCreator={props.setNewPhotoThunkCreator}/>
            <MyPostsContainer/>

        </div>
    )
}

export default Profile