import React  from "react";
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {setNewStatusThunkCreator} from "../../Store/profileReducer";
import {getStatus} from "../../Store/profileSelectors";

export const ProfileStatusH: React.FC = (props) => {

    const dispatch = useDispatch()
    const userStatus = useSelector(getStatus)
    const [editMode, setEditMode] = useState(true)
    const [status, setStatus] = useState(userStatus)

    useEffect(() => {
        setStatus(userStatus)
    }, [userStatus])

    const activateEditMode = () => {
        setEditMode(false)
    }

    const deactivateEditMode = () => {
        setEditMode(true)
        dispatch(setNewStatusThunkCreator(status))
    }

    const onChangeStatus = (text: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(text.currentTarget.value)
    }
        return (
            <div>
                {editMode
                    ? <div>
                            <span onDoubleClick={activateEditMode}> {userStatus} </span>
                    </div>
                    : <div>
                        <input onChange={onChangeStatus} onBlur={deactivateEditMode} autoFocus={true} value={status}/>
                    </div>
                }
            </div>
        )
}

export default ProfileStatusH
