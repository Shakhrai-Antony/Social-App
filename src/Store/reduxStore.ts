import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import appReducer from "./appReducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})



let store = createStore(rootReducer, applyMiddleware(thunk))
type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>
type PropertiesType<T> = T extends {[key: string] : infer U} ? U : never
export type InferActionsTypes <T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>



export default store;