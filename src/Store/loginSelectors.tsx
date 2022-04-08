import {AppStateType} from "./reduxStore";

export const loginSelector = (state: AppStateType) => {
    return state.auth.login
}

export const getCaptchaSelector = (state: AppStateType) => {
    return state.auth.captcha
}