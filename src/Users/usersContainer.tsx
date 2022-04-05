import React, {useEffect} from "react";
import {connect} from "react-redux";
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
    useEffect(() => {
        props.setTotalUsersThunkCreator(props.currentPage, props.pagesSize)
    }, [])

    const onPageChanged = (pageNumber: number) => {
        props.setUsersThunkCreator(pageNumber, props.pagesSize, props.term, props.friend)
    }
    const onFilterChanged = (term: string, isFriend: boolean) => {
        props.setUsersThunkCreator(1, props.pagesSize, term, isFriend)
    }
        return (
            <>
                {props.isFetching ? <Preloader/> : null}
                <UsersProfile
                    currentPage={props.currentPage} onPageChanged={onPageChanged}
                    users={props.users} totalItems={props.totalItems}
                    pagesSize={props.pagesSize}
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
    setTotalUsersThunkCreator: (currentPage: number, pageSize: number) => void
    setUsersThunkCreator: (pageNumber: number, pageSize: number, term: string, isFriend:boolean) => void
    unfollowUserThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void
}

type mapStateToPropsType = {
    users: Array<usersType>
    totalItems: number
    pagesSize: number
    currentPage: number
    isFetching: boolean
    isFollowingProgress: Array<number>
    isAuth: boolean
    term: string
    friend: boolean
}

let mapStateToProps = (state: any): mapStateToPropsType => {
    return {
        users: getUsers(state),
        totalItems: getTotalUsersCount(state),
        pagesSize: getPagesSize(state),
        currentPage: getCurrentPage(state),
        isFetching: requestIsFetching(state),
        isFollowingProgress: requestIsFollowingProgress(state),
        isAuth: requestIsAuth(state),
        term: setUsersFilter(state),
        friend: setIsFriend(state)
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
    setUsersThunkCreator, setTotalUsersThunkCreator,
    unfollowUserThunkCreator, followUsersThunkCreator
})(UsersContainer)


