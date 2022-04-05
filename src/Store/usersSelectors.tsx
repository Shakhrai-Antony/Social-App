import {appStateType} from "./reduxStore";

export const getUsers = (state:appStateType) => {
    return state.usersPage.users
}

export const getTotalUsersCount = (state:appStateType) => {
    return state.usersPage.totalItems
}

export const getPagesSize = (state:appStateType) => {
    return state.usersPage.pagesSize
}

export const getCurrentPage = (state:appStateType) => {
    return state.usersPage.currentPage
}

export const requestIsFetching = (state:appStateType) => {
    return state.usersPage.isFetching
}

export const requestIsFollowingProgress = (state:appStateType) => {
    return state.usersPage.isFollowingProgress
}

export const requestIsAuth = (state:appStateType) => {
    return state.auth.isAuth
}
export const setUsersFilter = (state:appStateType) => {
    return state.usersPage.term
}

export const setIsFriend = (state:appStateType) => {
    return state.usersPage.friend
}

