import {appStateType} from "./reduxStore";

export const setInitializedApp = (state: appStateType) => {
    return state.app.initialized
}