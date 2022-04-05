import {getUsersAPI, ResultCodesEnum} from "../DAL/API/API";
import {ThunkAction} from "redux-thunk";
import {appStateType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";


export type usersReducerStateType = {
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
    users: [] as Array<usersReducerStateType>,
    totalItems: 0,
    pagesSize: 10,
    currentPage: 1,
    isFetching: false,
    isFollowingProgress: [] as Array<number>,
    term: '' as string,
    friend: false
}

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: usersReducerActionType): initialStateType => {
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
                friend: action.isFriend
            }
        default:
            return state
    }
}

type usersReducerActionType = InferActionsTypes<typeof usersReducerActions>

export const usersReducerActions = {
    setUsers: (users: usersReducerStateType) => {
        return ({type: 'SET_USERS', users} as const)
    },
    unfollow: (usersId:number) => {
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
    setUsersByTerm: (term: string, isFriend: boolean) => {
        return ({type: 'SET_USERS_TERM', term, isFriend} as const)
    }
}


type usersReducerThunkType = ThunkAction<void, appStateType, unknown, usersReducerActionType>
type usersReducerDispatchType = Dispatch<usersReducerActionType>

export const setUsersThunkCreator = (pageNumber:number, pagesSize:number, term:string, isFriend:boolean): usersReducerThunkType => {
    return (dispatch: usersReducerDispatchType) => {
        dispatch(usersReducerActions.setIsFetching(true))
        dispatch(usersReducerActions.setCurrentPage(pageNumber))
        dispatch(usersReducerActions.setUsersByTerm(term, isFriend))
        getUsersAPI.setUsersAPI(pageNumber, pagesSize, term, isFriend).then(data => {
            dispatch(usersReducerActions.setIsFetching(false))
            dispatch(usersReducerActions.setUsers(data.items))

        })
    }
}

export const setTotalUsersThunkCreator = (currentPage: number, pagesSize: number): usersReducerThunkType => {
    return (dispatch: usersReducerDispatchType) => {
        dispatch(usersReducerActions.setIsFetching(true))
        getUsersAPI.setTotalUsersAPI(currentPage, pagesSize).then(data => {
            dispatch(usersReducerActions.setIsFetching(false))
            dispatch(usersReducerActions.setUsers(data.items))
            dispatch(usersReducerActions.setTotalUsersCount(data.totalCount))
        })
    }
}

export const unfollowUsersThunkCreator = (userId: number): usersReducerThunkType => {
    return (dispatch: usersReducerDispatchType) => {
        dispatch(usersReducerActions.isFollowingInProgress(true, userId))
        getUsersAPI.unfollowUserAPI(userId).then(data => {
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(usersReducerActions.unfollow(userId))
            }
            dispatch(usersReducerActions.isFollowingInProgress(false, userId))
        })
    }
}

export const followUsersThunkCreator = (usersId: number): usersReducerThunkType => {
    return (dispatch: usersReducerDispatchType) => {
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