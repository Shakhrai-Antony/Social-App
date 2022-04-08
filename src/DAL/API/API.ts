import axios from "axios";
import {ProfileType} from "../../Store/profileReducer";


export const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': '577386e2-2b2a-429c-9df5-023a52f00da6'},
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

type GetUsersAPIType = {
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
    statusFriend: string
}

export const getUsersAPI = {
    unfollowUserAPI(userId: number) {
       return instance.delete<GetUsersAPIType>(`follow/${userId}`).then(response => {
            return (
                response.data
            )
        })
    },
    followUserAPI(userId: number){
        return instance.post<GetUsersAPIType>(`follow/${userId}`).then(response => {
            return (
                response.data
            )
        })
    },
    setTotalUsersAPI(currentPage: number, pagesSize: number){
        return instance.get<GetUsersAPIType>(`users?page=${currentPage}&count=${pagesSize}`).then(response => {
            return (
                response.data
            )
        })
    },
    setUsersAPI(pageNumber: number, pagesSize: number, term: string, statusFriend: string) {
        return instance.get<GetUsersAPIType>((`users?page=${pageNumber}&count=${pagesSize}&term=${term}`
            + (statusFriend === null ? '' : `&friend=${statusFriend}`)))
            .then(response => {
            return (
                response.data
            )
        })
    }
}

type GetUsersProfileAPIType = {
    resultCode: ResultCodesEnum
    data: ProfileType
}

type SetNewStatusProfileAPIType<D = {}> = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: D
}

type SetUserPhotoType = {
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
        return instance.get<GetUsersProfileAPIType>(`profile/${userId}`).then(response => {
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
       return instance.put<SetNewStatusProfileAPIType>(`profile/status`, {status:status}).then(response => {
            return (
                response.data
            )
        })
    },
    setUserPhoto (photo: any) {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put<SetUserPhotoType>(`profile/photo`, formData, {
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

type LogInUserType = {
    email: string
    password: string
    rememberMe: boolean | number
    captcha: boolean
    resultCode: ResultCodesEnum
}

type SetAuthUserType = {
        id: number
        email: string
        login: string
}

type GetCaptchaType = {
    url: string
}

export const userValidationAPI = {
    logInUser(email: string, password: string, rememberMe: boolean | number, captcha: string) {
        return instance.post<LogInUserType>(`auth/login`, {email, password, rememberMe, captcha}).then(response => {
            return (
                response.data
            )
        })
    },
    logOutUser () {
        return instance.delete<LogInUserType>(`auth/login`).then(response => {
            return (
                response.data
            )
        })
    },
    setAuthUser () {
        return instance.get<ResponseType<SetAuthUserType>>('auth/me', {withCredentials: true}).then(response => {
            return (
                response.data
            )
        })
    },
    getCaptcha () {
        return instance.get<GetCaptchaType>(`security/get-captcha-url`).then(response => {
            return (
                response.data
            )
        })
    }
}
