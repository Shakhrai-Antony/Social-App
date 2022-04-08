import {getUsersProfileAPI} from "../DAL/API/API";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";

export type MessagesType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileType = {
    userId?: number | null
    [photos: string]: any
    fullName?: string | null
    lookingForAJob?: boolean | null
    lookingForAJobDescription?: string | null
    contacts?: string | null
    github?: string | null
    vk?: string | null
    facebook?: string | null
    instagram?: string | null
    twitter?: string | null
    website?: string | null
    youtube?: string | null
    mainLink?: string | null
}

let initialState = {
    messages: [
        {id: 1, message: 'Why nobody loves me?', likesCount: 1},
        {id: 2, message: 'Is anyone here?', likesCount: 1}
    ] as Array<MessagesType>,
    newMessage: '' as string,
    profile: null as ProfileType | null,
    status: '' as string
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ProfileReducerActionType): InitialStateType => {

    switch (action.type) {
        case 'UPDATE_NEW_POST': {
            return {
                ...state,
                newMessage: action.text
            }
        }
        case 'ADD_POST': {
            return {
                ...state,
                messages: [...state.messages, {id: 3, message: state.newMessage, likesCount: 1}],
                newMessage: ''
            }
        }
        case 'SET_NEW_PROFILE' :
            return {
                ...state,
                profile: action.newProfile
            }
        case 'GET_NEW_STATUS':
            return {
                ...state,
                status: action.newStatus
            }
        case 'SET_NEW_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }
}

type ProfileReducerActionType = InferActionsTypes<typeof profileReducerActions>

export const profileReducerActions = {
    updateNewPostActionCreator: (text: string) => {
        return ({type: 'UPDATE_NEW_POST', text} as const)
    },
    addPostActionCreator: () => {
        return ({type: 'ADD_POST'} as const)
    },
    setNewProfile: (newProfile: ProfileType) => {
        return ({type: 'SET_NEW_PROFILE', newProfile} as const)
    },
    getNewStatus: (newStatus: string) => {
        return ({type: 'GET_NEW_STATUS', newStatus} as const)
    },
    updateNewPhoto: (photos: ProfileType) => {
        return ({type: 'SET_NEW_PHOTO', photos} as const)
    }
}

type ProfileReducerThunkType = ThunkAction<void, AppStateType, unknown, ProfileReducerActionType>
export type ProfileReducerDispatchType = Dispatch<ProfileReducerActionType>

export const setUsersProfileThunkCreator = (userId: number): ProfileReducerThunkType => {
    return (dispatch: ProfileReducerDispatchType) => {
        getUsersProfileAPI.setUsersProfileAPI(userId).then(data => {
            dispatch(profileReducerActions.setNewProfile(data))
        })
    }
}
export const getNewStatusThunkCreator = (userId: number): ProfileReducerThunkType => {
    return (dispatch: ProfileReducerDispatchType) => {
        getUsersProfileAPI.getNewStatusProfileAPI(userId).then(data => {
            dispatch(profileReducerActions.getNewStatus(data))
        })
    }
}
export const setNewStatusThunkCreator = (status: string ): ProfileReducerThunkType => {
    return (dispatch: ProfileReducerDispatchType) => {
        getUsersProfileAPI.setNewStatusProfileAPI(status).then(data => {
            if (data.resultCode === 0) {
                dispatch(profileReducerActions.getNewStatus(status))
            }

        })
    }
}
export const setNewPhotoThunkCreator = (photo: string): ProfileReducerThunkType => {
    return (dispatch: ProfileReducerDispatchType) => {
        getUsersProfileAPI.setUserPhoto(photo).then(data => {
            if (data.resultCode === 0) {
                dispatch(profileReducerActions.updateNewPhoto(data.data.photos))
            }

        })
    }
}

export default profileReducer