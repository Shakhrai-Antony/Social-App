import React from "react";
// @ts-ignore
import s from './Dialogs.module.css'
import FriendsList from "./FriendsList/FriendsList";
import MessagesList from "./MessagesList/MessagesList";
import {dialogsType, usersType} from "../Store/dialogsReducer";

type dialogsStateType = {
    users: Array<usersType>
    dialogs: Array<dialogsType>
    newDialogMessage: string
    changeNewMessage: (text: string) => void
    newDialog: () => void
}

const Dialogs: React.FC<dialogsStateType> = (props) => {

    const usersList = props.users.map(u =>
        <FriendsList key={u.id} id={u.id} name={u.name}/>
    )

    const messagesList = props.dialogs.map(m =>
        <MessagesList key={m.id} message={m.message} id={m.id}/>
    )

    const onChangeNewMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewMessage(e.currentTarget.value)
    }

    const addNewDialog = () => {
        props.newDialog()
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {usersList}
            </div>
            <div className={s.messagesItem}>
                {messagesList}
            </div>

            <div>
                <textarea value={props.newDialogMessage} onChange={onChangeNewMessage}/>
                <span>
                    <button onClick={addNewDialog}>add smth</button>
                </span>
            </div>
        </div>
    )
}

export default Dialogs