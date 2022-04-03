import React  from "react";
import {useEffect, useState} from "react"

type profileStatusHType = {
    status: string
    setNewStatusThunkCreator: (status: string) => void
}

export const ProfileStatusH: React.FC<profileStatusHType> = (props) => {

    const [editMode, setEditMode] = useState(true)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(false)
    }

    const deactivateEditMode = () => {
        setEditMode(true)
        props.setNewStatusThunkCreator(status)
    }

    const onChangeStatus = (text: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(text.currentTarget.value)
    }

        return (
            <div>
                {editMode
                    ? <div>
                            <span onDoubleClick={activateEditMode}> {props.status} </span>
                    </div>
                    : <div>
                        <input onChange={onChangeStatus} onBlur={deactivateEditMode} autoFocus={true} value={status}/>
                    </div>
                }
            </div>
        )
}

export default ProfileStatusH
