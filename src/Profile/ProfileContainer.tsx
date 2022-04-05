import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getNewStatusThunkCreator, profileType, setNewPhotoThunkCreator,
    setNewStatusThunkCreator,
    setUsersProfileThunkCreator,
} from "../Store/profileReducer";

import {useMatch, useNavigate} from "react-router-dom";
import {appStateType} from "../Store/reduxStore";

const ProfileContainer: React.FC<ProfileContainerType> = (props) => {

    let refreshProfile = () => {
        let userId = props.match ? props.match.params.userId : props.id;
        props.setUsersProfileThunkCreator(userId)
        props.getNewStatusThunkCreator(userId)
    }

    useEffect(() => {
        refreshProfile()
    }, [props.match])

    return (
        <Profile profile={props.profile} status={props.status}
                 setNewStatusThunkCreator={props.setNewStatusThunkCreator}
                 setNewPhotoThunkCreator={props.setNewPhotoThunkCreator}
                 isOwner={props.match === null}/>
    )

}

type ProfileContainerType = {
    setUsersProfileThunkCreator: (userId: number) => void
    getNewStatusThunkCreator: (userId: number) => void
    setNewStatusThunkCreator: (status: string) => void
    setNewPhotoThunkCreator: (photo: File) => void
    match: any
    profile: profileType
    status: string
    id: number
}

const ProfileURLMatch: React.FC<propsType> = (props) => {
    const match = useMatch('/profile/:userId/');
    let navigate = useNavigate()
    useEffect(() => {
        if (!props.isAuth) {
            return navigate('/login')
        }
    })
    // @ts-ignore
    return <ProfileContainer {...props} match={match}/>;
}

type propsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    profile: profileType | null,
    isAuth: boolean,
    status: string | null,
    id: number | null
}

type mapDispatchToPropsType = {
    setUsersProfileThunkCreator: (userId: number) => void
    getNewStatusThunkCreator: (userId: number) => void
    setNewStatusThunkCreator: (status: string) => void
    setNewPhotoThunkCreator: (status: string) => void
}

let mapStateToProps = (state: appStateType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        id: state.auth.id,
    }
}

export default connect<mapStateToPropsType, mapDispatchToPropsType, appStateType>
    // @ts-ignore
    (mapStateToProps, {
        setUsersProfileThunkCreator, getNewStatusThunkCreator,
        setNewStatusThunkCreator, setNewPhotoThunkCreator
    })
    (ProfileURLMatch)