import {getUsersAPI, ResultCodesEnum} from "../DAL/API/API";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";

export type UsersReducerStateType = {
    name: string
    id: number
    photos: {
        small: null | string
        large: null | string
    }
    status: string
    followed: boolean
    totalItems: number
    key?: number
}

let initialState = {
    users: [] as Array<UsersReducerStateType>,
    totalItems: 0,
    pagesSize: 10,
    currentPage: 1,
    isFetching: false,
    isFollowingProgress: [] as Array<number>,
    term: '' as string,
    friend: ''
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: UsersReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                // @ts-ignore
                ...state, users: action.users
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.usersId) {
                        return {...u, followed: false}

                    }
                    return u
                })
            }
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.usersId) {
                        return {...u, followed: true}

                    }
                    return u
                })
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalItems: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page,
            }
        case 'SET_IS_FETCHING':
            return {
                ...state,
                isFetching: action.fetching
            }
        case 'SET_IS_FOLLOWING':
            return {
                ...state,
                isFollowingProgress: action.fetching
                    ? [...state.isFollowingProgress, action.usersId]
                    : state.isFollowingProgress.filter(id => id !== action.usersId)

            }
        case 'SET_USERS_TERM':
            return {
                ...state,
                term: action.term,
                friend: action.statusFriend
            }
        default:
            return state
    }
}

type UsersReducerActionType = InferActionsTypes<typeof usersReducerActions>

export const usersReducerActions = {
    setUsers: (users: UsersReducerStateType) => {
        return ({type: 'SET_USERS', users} as const)
    },
    unfollow: (usersId :number) => {
        return ({type: 'UNFOLLOW', usersId} as const)
    },

    follow: (usersId:number) => {
        return ({type: 'FOLLOW', usersId} as const)
    },

    setTotalUsersCount: (users:number) => {
        return ({type: 'SET_TOTAL_USERS_COUNT', users} as const)
    },

    setCurrentPage: (page: number) => {
        return ({type: 'SET_CURRENT_PAGE', page} as const)
    },
    setIsFetching: (fetching: boolean) => {
        return ({type: 'SET_IS_FETCHING', fetching} as const)
    },

    isFollowingInProgress: (fetching:boolean, usersId:number) => {
        return ({type: 'SET_IS_FOLLOWING', fetching, usersId} as const)
    },
    setUsersByTerm: (term: string, statusFriend: string) => {
        return ({type: 'SET_USERS_TERM', term, statusFriend} as const)
    }
}


type UsersReducerThunkType = ThunkAction<void, AppStateType, unknown, UsersReducerActionType>
type UsersReducerDispatchType = Dispatch<UsersReducerActionType>

export const setUsersThunkCreator = (pageNumber:number, pagesSize:number, term:string, statusFriend:string): UsersReducerThunkType => {
    return (dispatch: UsersReducerDispatchType) => {
        dispatch(usersReducerActions.setIsFetching(true))
        dispatch(usersReducerActions.setCurrentPage(pageNumber))
        dispatch(usersReducerActions.setUsersByTerm(term, statusFriend))
        getUsersAPI.setUsersAPI(pageNumber, pagesSize, term, statusFriend).then(data => {
            dispatch(usersReducerActions.setIsFetching(false))
            dispatch(usersReducerActions.setUsers(data.items))
        })
    }
}

export const setTotalUsersThunkCreator = (currentPage: number, pagesSize: number): UsersReducerThunkType => {
    return (dispatch: UsersReducerDispatchType) => {
        dispatch(usersReducerActions.setIsFetching(true))
        getUsersAPI.setTotalUsersAPI(currentPage, pagesSize).then(data => {
            dispatch(usersReducerActions.setIsFetching(false))
            dispatch(usersReducerActions.setUsers(data.items))
            dispatch(usersReducerActions.setTotalUsersCount(data.totalCount))
        })
    }
}

export const unfollowUsersThunkCreator = (userId: number): UsersReducerThunkType => {
    return (dispatch: UsersReducerDispatchType) => {
        dispatch(usersReducerActions.isFollowingInProgress(true, userId))
        getUsersAPI.unfollowUserAPI(userId).then(data => {
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(usersReducerActions.unfollow(userId))
            }
            dispatch(usersReducerActions.isFollowingInProgress(false, userId))
        })
    }
}

export const followUsersThunkCreator = (usersId: number): UsersReducerThunkType => {
    return (dispatch: UsersReducerDispatchType) => {
        dispatch(usersReducerActions.isFollowingInProgress(true, usersId))
        getUsersAPI.followUserAPI(usersId).then(data => {
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(usersReducerActions.follow(usersId))
            }
            dispatch(usersReducerActions.isFollowingInProgress(false, usersId))
        })
    }
}

export default usersReducer