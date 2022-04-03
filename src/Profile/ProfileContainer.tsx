import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getNewStatusThunkCreator, messagesType, profileType, setNewPhotoThunkCreator,
    setNewStatusThunkCreator,
    setUsersProfileThunkCreator,
} from "../Store/profileReducer";

import { useMatch, useNavigate} from "react-router-dom";
import {appStateType} from "../Store/reduxStore";

class ProfileContainer extends React.Component<ProfileContainerType> {

    refreshProfile(){
        let userId = this.props.match ? this.props.match.params.userId : this.props.id;
        this.props.setUsersProfileThunkCreator(userId)
        this.props.getNewStatusThunkCreator(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) {
        if (this.props.match !== prevProps.match ) {
            this.refreshProfile()
        }
    }

    render () {
        return (
            <Profile profile={this.props.profile} status={this.props.status}
                     setNewStatusThunkCreator={this.props.setNewStatusThunkCreator}
                     setNewPhotoThunkCreator={this.props.setNewPhotoThunkCreator}
                     isOwner={this.props.match === null}/>
        )
    }
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
            return navigate('/Login')
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


export default connect<mapStateToPropsType,mapDispatchToPropsType,appStateType>
    // @ts-ignore
(mapStateToProps, {
     setUsersProfileThunkCreator, getNewStatusThunkCreator,
    setNewStatusThunkCreator, setNewPhotoThunkCreator})
(ProfileURLMatch)