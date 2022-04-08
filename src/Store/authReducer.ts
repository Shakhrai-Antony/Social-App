import {userValidationAPI} from "../DAL/API/API";
import {InferActionsTypes} from "./reduxStore";

interface IState {
    email: string | null
}

let initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false as boolean,
    captcha: null as string | null
}

export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: authReducerActionType): initialStateType => {
    switch (action.type) {
        case 'SET_AUTH_DATA':
            return {
                ...state,
                ...action.data
            }
        case 'SET_CAPTCHA':
            return {
                ...state,
                captcha: action.url
            }
        default:
            return state
    }
}

type authReducerActionType = InferActionsTypes<typeof authReducerActions>

export const authReducerActions = {
    setAuthUserData: (email: string | null, id: number | null, login: string | null, isAuth: boolean) => {
        return ({type: 'SET_AUTH_DATA', data: {email, id, login, isAuth}} as const)
    },
    setCaptchaSuccess: (url: string | null) => {
        return ({type: 'SET_CAPTCHA', url} as const)
    }
}

export const setAuthUserDataThunkCreator = () => {
    return (dispatch: any ) => {
        return userValidationAPI.setAuthUser().then(data => {
            if (data.resultCode === 0) {
                let {email, id, login} = data.data
                dispatch(authReducerActions.setAuthUserData(email, id, login, true))
            }
        })
    }
}

export const setLogInUserThunkCreator = (email:string, password:string, rememberMe:boolean, captcha:string) => {
    return (dispatch: any) => {
        userValidationAPI.logInUser(email, password, rememberMe, captcha).then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserDataThunkCreator())
            }
        })
    }
}

export const setLogOutUserThunkCreator = () => {
    return (dispatch:any) => {
        userValidationAPI.logOutUser().then(data => {
            if (data.resultCode === 0) {
                dispatch(authReducerActions.setAuthUserData(null, null, null, false))
            }
        })
    }
}

export const getCaptchaSuccessThunkCreator = () => {
    return  (dispatch:any) => {
        userValidationAPI.getCaptcha().then(data => {
            dispatch(authReducerActions.setCaptchaSuccess(data.url))
        })
    }
}

export default authReducer