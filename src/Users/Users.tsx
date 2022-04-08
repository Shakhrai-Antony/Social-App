import React from "react";
import {NavLink} from "react-router-dom";
import s from "./users.module.css";
import userPhoto from "../assets/images/user.png";
import {useDispatch} from "react-redux";
import {followUsersThunkCreator, unfollowUsersThunkCreator, UsersReducerStateType} from "../Store/usersReducer";

type UserType = {
    isFollowingProgress: Array<number>
    u: UsersReducerStateType
}

const Users: React.FC<UserType> = (props) => {
    const dispatch = useDispatch()

    const unfollowUser = (userId: number) => {
        dispatch(unfollowUsersThunkCreator(userId))
    }
    const followUser = (usersId: number) => {
        dispatch(followUsersThunkCreator(usersId))
    }

    return <div>
        <span>
                    <div>
                        <NavLink to={'/profile/' + props.u.id}>
                        <img className={s.avaUser} src={props.u.photos.small ? props.u.photos.small : userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {props.u.followed
                            ? <button disabled={props.isFollowingProgress.some(id => id === props.u.id)}
                                      onClick={() => {
                                          unfollowUser(props.u.id)
                                      }}>unfollow</button>
                            : <button disabled={props.isFollowingProgress.some(id => id === props.u.id)}
                                      onClick={() => {
                                          followUser(props.u.id)
                                      }}>follow</button>}
                    </div>
                </span>
        <span>
                        <span>
                            <div>
                                    {props.u.name}
                                </div>
                                <div>
                                    {props.u.status}
                                </div>
                        </span>
                    </span>
    </div>
}

export default Users