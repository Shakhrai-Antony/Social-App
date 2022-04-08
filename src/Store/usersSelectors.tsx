import {AppStateType} from "./reduxStore";

export const getUsers = (state:AppStateType) => {
    return state.usersPage.users
}

export const getTotalUsersCount = (state:AppStateType) => {
    return state.usersPage.totalItems
}

export const getPagesSize = (state:AppStateType) => {
    return state.usersPage.pagesSize
}

export const getCurrentPage = (state:AppStateType) => {
    return state.usersPage.currentPage
}

export const requestIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching
}

export const requestIsFollowingProgress = (state:AppStateType) => {
    return state.usersPage.isFollowingProgress
}

export const requestIsAuth = (state:AppStateType) => {
    return state.auth.isAuth
}
export const setUsersFilter = (state:AppStateType) => {
    return state.usersPage.term
}

export const setIsFriend = (state:AppStateType) => {
    return state.usersPage.friend
}

