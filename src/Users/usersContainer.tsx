import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setTotalUsersThunkCreator,
    setUsersThunkCreator
} from "../Store/usersReducer";
import UsersProfile from "./usersProfile";
import Preloader from "../common/preloader/Peloader";
import {
    getCurrentPage, getPagesSize, requestIsFetching, setIsFriend, setUsersFilter
} from "../Store/usersSelectors";

export const UsersContainer:React.FC<propsType> = (props:any) => {
    const dispatch = useDispatch()
    const currentPage = useSelector(getCurrentPage)
    const pagesSize = useSelector(getPagesSize)
    const term = useSelector(setUsersFilter)
    const friend = useSelector(setIsFriend)
    const isFetching = useSelector(requestIsFetching)

    useEffect(() => {
        dispatch(setTotalUsersThunkCreator(currentPage, pagesSize))
    }, [])
    const onPageChanged = (pageNumber: number) => {
        dispatch(setUsersThunkCreator(pageNumber, pagesSize, term, friend))
    }
    const onFilterChanged = (term: string, isFriend: boolean) => {
        dispatch(setUsersThunkCreator(1, pagesSize, term, isFriend))
    }
        return (
            <>
                {isFetching ? <Preloader/> : null}
                <UsersProfile
                    currentPage={currentPage} onPageChanged={onPageChanged}
                    pagesSize={pagesSize}
                    onFilterChanged={onFilterChanged}
                />
            </>
        )
}

type propsType = ownPropsType

type ownPropsType = {
    pageNumber: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (term: string, isFriend: boolean) => void
}



/*
const loginUsersRedirect = (props) => {
    let navigate = useNavigate()
    useEffect(() => {
        if (!props.isAuth) {
            return navigate('/Login')
        }
    })
    return <UsersContainer {...props} />
}*/


