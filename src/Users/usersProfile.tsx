import React from "react";
import Paginator from "./Paginator";
import Users from "./Users";
import {useSelector} from "react-redux";
import {getTotalUsersCount, getUsers, requestIsFollowingProgress} from "../Store/usersSelectors";

type UsersProfileType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    pagesSize: number
    onFilterChanged:(filter: string, isFriend: string) => void
}

const UsersProfile: React.FC<UsersProfileType> = (props) => {
    const users = useSelector(getUsers)
    const totalItems = useSelector(getTotalUsersCount)
    const isFollowingProgress = useSelector(requestIsFollowingProgress)

    return <div>

        <div>
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalItems={totalItems}
                       pagesSize={props.pagesSize} onFilterChanged={props.onFilterChanged}/>
        </div>

        {users.map(u => <Users u={u} key={u.id} isFollowingProgress={isFollowingProgress}/>)
        }
    </div>
}

export default UsersProfile
