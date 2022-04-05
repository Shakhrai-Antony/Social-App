import {appStateType} from "./reduxStore";

export const getUsers = (state: appStateType) => {
   return state.dialogsPage.users
}

export const getDialogs = (state: appStateType) => {
    return state.dialogsPage.dialogs
}

export const getNewDialogsMessage = (state: appStateType) => {
    return state.dialogsPage.newDialogMessage
}

export const isUserAuth = (state: appStateType) => {
    return state.auth.isAuth
}