import {appStateType} from "./reduxStore";

export const loginSelector = (state: appStateType) => {
    return state.auth.login
}