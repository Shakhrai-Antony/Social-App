import React from "react";
import {NavLink} from "react-router-dom";
import s from "./users.module.css";
import userPhoto from "../assets/images/user.png";
import {usersType} from "../Store/dialogsReducer";

type userType = {
    u: usersType
    isFollowingProgress: Array<number>
    unfollowUserThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void
}


const Users: React.FC<userType> = (props) => {

    const unfollowUser = (userId:number) => {
        props.unfollowUserThunkCreator(userId)
    }
    const followUser = (usersId:number) => {
        props.followUsersThunkCreator(usersId)
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