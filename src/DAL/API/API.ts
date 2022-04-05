import axios from "axios";
import {usersType} from "../../Store/dialogsReducer";
import {messagesType, profileType} from "../../Store/profileReducer";
import {usersReducerStateType} from "../../Store/usersReducer";

export const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': '577386e2-2b2a-429c-9df5-023a52f00da6'},
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

type getUsersAPIType = {
    items: {
        name: string
        id: number
        photos: {
            small: null | string
            large: null | string
        }
        status: string
        followed: boolean
        totalItems: number
    }
    term: string
    totalCount: number
    resultCode: ResultCodesEnum
    isFriend: boolean
}

export const getUsersAPI = {
    unfollowUserAPI(userId: number) {
       return instance.delete<getUsersAPIType>(`follow/${userId}`).then(response => {
            return (
                response.data
            )
        })
    },
    followUserAPI(userId: number){
        return instance.post<getUsersAPIType>(`follow/${userId}`).then(response => {
            return (
                response.data
            )
        })
    },
    setTotalUsersAPI(currentPage: number, pagesSize: number){
        return instance.get<getUsersAPIType>(`users?page=${currentPage}&count=${pagesSize}`).then(response => {
            return (
                response.data
            )
        })
    },
    setUsersAPI(pageNumber: number, pagesSize: number, term: string, isFriend: boolean) {
        console.log(isFriend)
        return instance.get<getUsersAPIType>((`users?page=${pageNumber}&count=${pagesSize}&term=${term}`
            + (isFriend === null ? '' : `&friend=${isFriend}`)))
            .then(response => {
            return (
                response.data
            )
        })
    }
}

type getUsersProfileAPIType = {
    resultCode: ResultCodesEnum
    data: profileType
}

type setNewStatusProfileAPIType<D = {}> = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: D
}

type setUserPhotoType = {
    data: {
        photos: {
            small: string
            large: string
        }
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const getUsersProfileAPI  = {
    setUsersProfileAPI (userId: number){
        return instance.get<getUsersProfileAPIType>(`profile/${userId}`).then(response => {
            return (
                response.data
            )
        })
    },
    getNewStatusProfileAPI (userId: number) {
        return instance.get(`profile/status/${userId}`).then(response => {
            return (
                response.data
            )
        })
    },
    setNewStatusProfileAPI (status: string) {
       return instance.put<setNewStatusProfileAPIType>(`profile/status`, {status:status}).then(response => {
            return (
                response.data
            )
        })
    },
    setUserPhoto (photo: any) {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put<setUserPhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } ).then (response => {
            return (
                response.data
            )
        })
    }
}

type ResponseType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: ResultCodesEnum
}

type logInUserType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
    resultCode: ResultCodesEnum
}

type setAuthUserType = {
        id: number
        email: string
        login: string
}

type getCaptchaType = {
    url: string
}

export const userValidationAPI = {
    logInUser(email: string, password: string, rememberMe: boolean | string, captcha: string) {
        return instance.post<logInUserType>(`auth/login`, {email, password, rememberMe, captcha}).then(response => {
            return (
                response.data
            )
        })
    },
    logOutUser () {
        return instance.delete<logInUserType>(`auth/login`).then(response => {
            return (
                response.data
            )
        })
    },
    setAuthUser () {
        return instance.get<ResponseType<setAuthUserType>>('auth/me', {withCredentials: true}).then(response => {
            return (
                response.data
            )
        })
    },
    getCaptcha () {
        return instance.get<getCaptchaType>(`security/get-captcha-url`).then(response => {
            return (
                response.data
            )
        })
    }
}
