import {setAuthUserDataThunkCreator} from "./authReducer";
import {InferActionsTypes} from "./reduxStore";

let initialState = {
    initialized: false as boolean
}

export type initialStateType = typeof initialState

const appReducer = (state = initialState, action: appReducerActionType): initialStateType => {
    switch (action.type) {
        case 'SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actions = {
    setInitializedAC: (): any => {
        return ({type: 'SET_INITIALIZED'} as const)
    }
}

type appReducerActionType = InferActionsTypes<typeof actions>

export const initializedSuccess = () => {
    return (dispatch: any) => {
        let promise = dispatch(setAuthUserDataThunkCreator())
        promise.then(() => {
            dispatch(actions.setInitializedAC())
        })
    }
}

export default appReducer