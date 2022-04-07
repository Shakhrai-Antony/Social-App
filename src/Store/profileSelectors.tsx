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

export const getMessages = (state: appStateType) => {
    return state.profilePage.messages
}

export const getNewMessage = (state: appStateType) => {
    return state.profilePage.newMessage
}