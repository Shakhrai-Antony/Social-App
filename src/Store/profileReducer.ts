import {getUsersProfileAPI} from "../DAL/API/API";
import {ThunkAction} from "redux-thunk";
import {appStateType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";

export type messagesType = {
    id: number
    message: string
    likesCount: number
}

export type profileType = {
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
    ] as Array<messagesType>,
    newMessage: '' as string,
    profile: null as profileType | null,
    status: '' as string | null
}

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: profileReducerActionType): initialStateType => {

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

type profileReducerActionType = InferActionsTypes<typeof profileReducerActions>

export const profileReducerActions = {
    updateNewPostActionCreator: (text: string) => {
        return ({type: 'UPDATE_NEW_POST', text} as const)
    },
    addPostActionCreator: () => {
        return ({type: 'ADD_POST'} as const)
    },
    setNewProfile: (newProfile: profileType) => {
        return ({type: 'SET_NEW_PROFILE', newProfile} as const)
    },
    getNewStatus: (newStatus: string | null) => {
        return ({type: 'GET_NEW_STATUS', newStatus} as const)
    },
    updateNewPhoto: (photos: profileType) => {
        return ({type: 'SET_NEW_PHOTO', photos} as const)
    }
}

type profileReducerThunkType = ThunkAction<void, appStateType, unknown, profileReducerActionType>
export type profileReducerDispatchType = Dispatch<profileReducerActionType>

export const setUsersProfileThunkCreator = (userId: number): profileReducerThunkType => {
    return (dispatch: profileReducerDispatchType) => {
        getUsersProfileAPI.setUsersProfileAPI(userId).then(data => {
            dispatch(profileReducerActions.setNewProfile(data))
        })
    }
}
export const getNewStatusThunkCreator = (userId: number): profileReducerThunkType => {
    return (dispatch: profileReducerDispatchType) => {
        getUsersProfileAPI.getNewStatusProfileAPI(userId).then(data => {
            dispatch(profileReducerActions.getNewStatus(data))
        })
    }
}
export const setNewStatusThunkCreator = (status: string): profileReducerThunkType => {
    return (dispatch: profileReducerDispatchType) => {
        getUsersProfileAPI.setNewStatusProfileAPI(status).then(data => {
            if (data.resultCode === 0) {
                dispatch(profileReducerActions.getNewStatus(status))
            }

        })
    }
}
export const setNewPhotoThunkCreator = (photo: string): profileReducerThunkType => {
    return (dispatch: profileReducerDispatchType) => {
        getUsersProfileAPI.setUserPhoto(photo).then(data => {
            if (data.resultCode === 0) {
                dispatch(profileReducerActions.updateNewPhoto(data.data.photos))
            }

        })
    }
}

export default profileReducer