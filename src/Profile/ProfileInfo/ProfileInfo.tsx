import React from "react";
import Preloader from "../../common/preloader/Peloader";
import s from './profileInfo.module.css'
import userPhoto from './../../assets/images/user.png'
import {profileType} from "../../Store/profileReducer";
import ProfileStatusH from "./ProfileStatusH";


type profileInfoTypes = {
    status: string
    setNewStatusThunkCreator: (status: string) => void
    profile: profileType
    setNewPhotoThunkCreator:(photo:File) => void
    isOwner: boolean
}

const ProfileInfo: React.FC<profileInfoTypes> = (props) => {

    if (!props.profile) {
        return (
            <Preloader/>
        )
    }

    const onChangePhoto = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            props.setNewPhotoThunkCreator(e.target.files[0])
        } else {
            e.target.files = null
        }

    }
    return (
        <div>
            <div>
                {props.profile.fullName}
                <div className={s.userAva}>
                    <img src={props.profile.photos.small || userPhoto}/>
                    {props.isOwner && <input type={'file'} onChange={onChangePhoto} />}
                </div>
            </div>
            <ProfileStatusH  status={props.status} setNewStatusThunkCreator={props.setNewStatusThunkCreator}/>
        </div>
    )
}

export default ProfileInfo;