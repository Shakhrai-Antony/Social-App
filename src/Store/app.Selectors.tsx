import {AppStateType} from "./reduxStore";

export const setInitializedApp = (state: AppStateType) => {
    return state.app.initialized
}