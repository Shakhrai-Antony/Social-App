import React from "react";
import Preloader from "../../common/preloader/Peloader";
import s from './profileInfo.module.css'
import userPhoto from './../../assets/images/user.png'
import {setNewPhotoThunkCreator} from "../../Store/profileReducer";
import ProfileStatusH from "./ProfileStatusH";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../Store/profileSelectors";

type ProfileInfoType = {
    isOwner: boolean
}

const ProfileInfo: React.FC<ProfileInfoType> = (props: any) => {
    const dispatch = useDispatch()
    const userProfile = useSelector(getProfile)

    if (!userProfile) {
        return (
            <Preloader/>
        )
    }

    const onChangePhoto = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            // @ts-ignore
            dispatch(setNewPhotoThunkCreator(e.target.files[0]))
        } else {
            e.target.files = null
        }
    }
    return (
        <div>
            <div>
                {userProfile.fullName}
                <div className={s.userAva}>
                    <img src={userProfile.photos.small || userPhoto}/>
                    {props.isOwner && <input type={'file'} onChange={onChangePhoto}/>}
                </div>
            </div>
            <ProfileStatusH/>
        </div>
    )
}

export default ProfileInfo;