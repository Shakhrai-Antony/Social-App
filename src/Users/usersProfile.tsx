import React from "react";
import Paginator from "./Paginator";
import Users from "./Users";
import {usersType} from "../Store/dialogsReducer";
import UsersForm from "./UsersForm";


type usersProfileType = {
    users: Array<usersType>
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalItems: number
    pagesSize: number
    isFollowingProgress: Array<number>
    unfollowUserThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void
    onFilterChanged:(filter: string) => void
}

const UsersProfile: React.FC<usersProfileType> = (props) => {

    return <div>

        <div>
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalItems={props.totalItems}
                       pagesSize={props.pagesSize} onFilterChanged={props.onFilterChanged}/>
        </div>

        {props.users.map(u => <Users u={u} key={u.id}
                                        isFollowingProgress={props.isFollowingProgress}
                                        unfollowUserThunkCreator={props.unfollowUserThunkCreator}
                                        followUsersThunkCreator={props.followUsersThunkCreator}
                                        />)
        }
    </div>
}


export default UsersProfile
