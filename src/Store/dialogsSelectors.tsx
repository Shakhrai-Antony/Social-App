import {AppStateType} from "./reduxStore";

export const getUsers = (state: AppStateType) => {
   return state.dialogsPage.users
}

export const getDialogs = (state: AppStateType) => {
    return state.dialogsPage.dialogs
}

export const getNewDialogsMessage = (state: AppStateType) => {
    return state.dialogsPage.newDialogMessage
}
