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


class UsersContainer extends React.Component<propsType> {
    componentDidMount() {
        this.props.setTotalUsersThunkCreator(this.props.currentPage, this.props.pagesSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setUsersThunkCreator(pageNumber, this.props.pagesSize, this.props.term, this.props.friend)
    }
    onFilterChanged = (term: string, isFriend: boolean) => {
        this.props.setUsersThunkCreator(1, this.props.pagesSize, term, isFriend)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <UsersProfile
                    currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
                    users={this.props.users} totalItems={this.props.totalItems}
                    pagesSize={this.props.pagesSize}
                    isFollowingProgress={this.props.isFollowingProgress}
                    unfollowUserThunkCreator={this.props.unfollowUserThunkCreator}
                    followUsersThunkCreator={this.props.followUsersThunkCreator}
                    onFilterChanged={this.onFilterChanged}
                />
            </>
        )
    }
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


/*let mapDispatchToProps = (dispatch) => {
    return {
        onFollowUsers: (usersId) => {
            dispatch(followAC(usersId))
        },
        onUnfollowUsers: (usersId) => {
            dispatch(unfollowAC(usersId))
        },
        setNewUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setAllUsersCount:(users) => {
            dispatch(setTotalUsersCountAC(users))
        },
        setPage: (page) => {
            dispatch(setCurrentPageAC(page))
        },
        setIsFetching: (fetching) => {
            dispatch(setIsFetchingAC(fetching))
        }
    }
}*/


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


export default connect<mapStateToPropsType, mapDispatchToPropsType>
(mapStateToProps, {
    setUsersThunkCreator, setTotalUsersThunkCreator,
    unfollowUserThunkCreator, followUsersThunkCreator
})(UsersContainer)


