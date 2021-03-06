import {InferActionsTypes} from "./reduxStore";

export type UsersType = {
    id: number,
    name: string
    key: number
    photos?: any
    followed: boolean
    status: string
}

export type DialogsType = {
    id: number,
    message: string
    key?: number
}

let initialState = {
    users: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Semen'},
        {id: 3, name: 'Antony'}
    ] as Array<UsersType>,
    dialogs: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'How is your day?'}
    ] as Array<DialogsType>,
    newDialogMessage: '' as string
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: DialogsReducerActionType): InitialStateType => {

    switch (action.type) {
        case 'UPDATE_NEW_DIALOG':
            return {
                ...state,
                newDialogMessage: action.text
            }
        case 'ADD_NEW_DIALOG': {
            return {
                ...state,
                dialogs: [...state.dialogs, {id: 3, message: state.newDialogMessage}],
                newDialogMessage: ''
            }
        }
        default:
            return state
    }
}

export type DialogsReducerActionType = InferActionsTypes<typeof dialogsReducerActions>

export const dialogsReducerActions = {
    updateNewDialogActionCreator: (text: string) => {
        return ({type: 'UPDATE_NEW_DIALOG', text} as const)
    },
    addNewDialogActionCreator: () => {
        return ({type: 'ADD_NEW_DIALOG'} as const)
    }
}

export default dialogsReducer