export const getUsers = (state) => {
    return state.usersPage.users
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalItems
}

export const getPagesSize = (state) => {
    return state.usersPage.pagesSize
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const requestIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const requestIsFollowingProgress = (state) => {
    return state.usersPage.isFollowingProgress
}

export const requestIsAuth = (state) => {
    return state.auth.isAuth
}
export const setUsersFilter = (state) => {
    return state.usersPage.term
}

