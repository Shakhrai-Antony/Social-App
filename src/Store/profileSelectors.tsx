import {appStateType} from "./reduxStore";

export const getProfile = (state: appStateType) => {
    return state.profilePage.profile
}

export const getStatus = (state: appStateType) => {
    return state.profilePage.status
}

export const getUserId = (state: appStateType) => {
    return state.auth.id
}