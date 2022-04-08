import React, {useEffect} from "react";
import s from './Dialogs.module.css'
import FriendsList from "./FriendsList/FriendsList";
import MessagesList from "./MessagesList/MessagesList";
import {useDispatch, useSelector} from "react-redux";
import {getDialogs, getNewDialogsMessage, getUsers} from "../Store/dialogsSelectors";
import {dialogsReducerActions} from "../Store/dialogsReducer";
import {useNavigate} from "react-router-dom";
import {requestIsAuth} from "../Store/usersSelectors";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

type DialogsStateType = {
    onChangeNewMessage: (text: string) => void
    addNewDialog: () => void
}

export const Dialogs: React.FC<DialogsStateType> = (props) => {

    const users = useSelector(getUsers)
    const dialogs = useSelector(getDialogs)
    const newDialogMessage = useSelector(getNewDialogsMessage)
    const dispatch = useDispatch()

    const usersList = users.map(u =>
        <FriendsList key={u.id} id={u.id} name={u.name}/>
    )

    const messages = dialogs.map(m =>
        <MessagesList key={m.id} message={m.message} id={m.id}/>)

    const onChangeNewMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(dialogsReducerActions.updateNewDialogActionCreator(e.currentTarget.value))
    }

    const addNewDialog = () => {
        dispatch(dialogsReducerActions.addNewDialogActionCreator())
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsContainer}>
                <div className={s.dialogsItem}>
                    {usersList}
                </div>
                <div className={s.messagesItem}>
                    {messages}
                </div>
            </div>

            <div>
                <TextArea showCount maxLength={100} style={{ height: 80, width: 200 }} value={newDialogMessage} onChange={onChangeNewMessage} />
                <div>
                    <Button onClick={addNewDialog}>send message</Button>
                </div>
            </div>
        </div>
    )
}

export const LoginDialogsRedirect = (props:any) => {
    const isAuth = useSelector(requestIsAuth)
    let navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            return navigate('/login')
        }
    },[isAuth])
    return <Dialogs {...props} />
}

