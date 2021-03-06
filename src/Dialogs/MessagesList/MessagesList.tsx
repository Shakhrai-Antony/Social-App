import React from "react";
import s from "../Dialogs.module.css";

type MessagesListType = {
    message: string
    id?: number
}

const MessagesList: React.FC<MessagesListType> = (props) => {
    return (
        <div className={s.messagesItem}>
            {props.message}
        </div>
    )
}

export default MessagesList