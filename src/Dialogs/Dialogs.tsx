import React, {useEffect} from "react";
import s from './Dialogs.module.css'
import FriendsList from "./FriendsList/FriendsList";
import MessagesList from "./MessagesList/MessagesList";
import {useDispatch, useSelector} from "react-redux";
import {getDialogs, getNewDialogsMessage, getUsers} from "../Store/dialogsSelectors";
import {dialogsReducerActions} from "../Store/dialogsReducer";
import {useNavigate} from "react-router-dom";
import {requestIsAuth} from "../Store/usersSelectors";

type dialogsStateType = {
    onChangeNewMessage: (text: string) => void
    addNewDialog: () => void
}

export const Dialogs: React.FC<dialogsStateType> = (props) => {

    const users = useSelector(getUsers)
    const dialogs = useSelector(getDialogs)
    const newDialogMessage = useSelector(getNewDialogsMessage)
    const dispatch = useDispatch()

    const usersList = users.map(u =>
        <FriendsList key={u.id} id={u.id} name={u.name}/>
    )

    const messagesList = dialogs.map(m =>
        <MessagesList key={m.id} message={m.message} id={m.id}/>)

    const onChangeNewMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(dialogsReducerActions.updateNewDialogActionCreator(e.currentTarget.value))
    }

    const addNewDialog = () => {
        dispatch(dialogsReducerActions.addNewDialogActionCreator())
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
                <textarea value={newDialogMessage} onChange={onChangeNewMessage}/>
                <span>
                    <button onClick={addNewDialog}>add smth</button>
                </span>
            </div>
        </div>
    )
}

export const LoginDialogsRedirect = (props:any) => {
    const isAuth = useSelector(requestIsAuth)
    let navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            return navigate('/Login')
        }
    },[])
    return <Dialogs {...props} />
}

