import {AppStateType} from "./reduxStore";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
}

export const getUserId = (state: AppStateType) => {
    return state.auth.id
}

export const getMessages = (state: AppStateType) => {
    return state.profilePage.messages
}

export const getNewMessage = (state: AppStateType) => {
    return state.profilePage.newMessage
}