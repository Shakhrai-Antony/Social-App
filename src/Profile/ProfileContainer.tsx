import React, {useEffect} from "react";
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {
    getNewStatusThunkCreator,
    setUsersProfileThunkCreator,
} from "../Store/profileReducer";
import {useMatch, useNavigate} from "react-router-dom";
import {requestIsAuth} from "../Store/usersSelectors";
import {getUserId} from "../Store/profileSelectors";

const ProfileContainer: React.FC<any> = (props) => {

    const dispatch = useDispatch()
    let refreshProfile = () => {
        let userId = props.match ? props.match.params.userId : props.userId;
        dispatch(setUsersProfileThunkCreator(userId))
        dispatch(getNewStatusThunkCreator(userId))
    }
    const isOwner = props.match === null
    useEffect(() => {
        refreshProfile()
    }, [props.match])
    return (
        <Profile isOwner={isOwner}/>
    )
}

export const ProfileURLMatch: React.FC = (props) => {
    const isAuth = useSelector(requestIsAuth)
    const userId = useSelector(getUserId)
    const match = useMatch('/profile/:userId/');
    let navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            return navigate('/login')
        }
    })

    return <ProfileContainer {...props} match={match} userId={userId}/>;
}


