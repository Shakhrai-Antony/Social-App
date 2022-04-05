import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {
    followUsersThunkCreator,
    setTotalUsersThunkCreator,
    unfollowUserThunkCreator,
    setUsersThunkCreator
} from "../Store/usersReducer";
import UsersProfile from "./usersProfile";
import Preloader from "../common/preloader/Peloader";
import {
    getCurrentPage,
    getPagesSize,
    getTotalUsersCount,
    getUsers, requestIsAuth,
    requestIsFetching,
    requestIsFollowingProgress, setIsFriend, setUsersFilter
} from "../Store/usersSelectors";
import {usersType} from "../Store/dialogsReducer";
import {appStateType} from "../Store/reduxStore";

const UsersContainer:React.FC<propsType> = (props) => {

    const dispatch = useDispatch()
    const currentPage = useSelector(getCurrentPage)
    const pagesSize = useSelector(getPagesSize)
    const term = useSelector(setUsersFilter)
    const friend = useSelector(setIsFriend)

    useEffect(() => {
        dispatch(setTotalUsersThunkCreator(currentPage, pagesSize))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(setUsersThunkCreator(pageNumber, pagesSize, term, friend))
    }
    const onFilterChanged = (term: string, isFriend: boolean) => {
        dispatch(setUsersThunkCreator(1, pagesSize, term, isFriend))
    }
        return (
            <>
                {props.isFetching ? <Preloader/> : null}
                <UsersProfile
                    currentPage={currentPage} onPageChanged={onPageChanged}
                    users={props.users} totalItems={props.totalItems}
                    pagesSize={pagesSize}
                    isFollowingProgress={props.isFollowingProgress}
                    unfollowUserThunkCreator={props.unfollowUserThunkCreator}
                    followUsersThunkCreator={props.followUsersThunkCreator}
                    onFilterChanged={onFilterChanged}
                />
            </>
        )
}

type propsType = mapDispatchToPropsType & mapStateToPropsType & ownPropsType

type ownPropsType = {
    pageNumber: number
    onPageChanged: (pageNumber: number, term: string) => void
    onFilterChanged: (term: string, isFriend: boolean) => void
}

type mapDispatchToPropsType = {
    unfollowUserThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void
}

type mapStateToPropsType = {
    users: Array<usersType>
    totalItems: number
    isFetching: boolean
    isFollowingProgress: Array<number>
    isAuth: boolean
}

let mapStateToProps = (state: any): mapStateToPropsType => {
    return {
        users: getUsers(state),
        totalItems: getTotalUsersCount(state),
        isFetching: requestIsFetching(state),
        isFollowingProgress: requestIsFollowingProgress(state),
        isAuth: requestIsAuth(state)
    }
}

/*
const loginUsersRedirect = (props) => {
    let navigate = useNavigate()
    useEffect(() => {
        if (!props.isAuth) {
            return navigate('/Login')
        }
    })
    return <UsersContainer {...props} />
}*/

export default connect<mapStateToPropsType, mapDispatchToPropsType, appStateType>
(mapStateToProps, {
    unfollowUserThunkCreator, followUsersThunkCreator
})(UsersContainer)


