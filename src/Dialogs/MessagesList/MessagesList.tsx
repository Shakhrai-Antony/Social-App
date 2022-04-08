import React from "react";
import s from "../Dialogs.module.css";

type MessagesList = {
    message: string
    id?: number
}

const MessagesList: React.FC<MessagesList> = (props) => {
    return (
        <div className={s.messagesItem}>
            {props.message}
        </div>
    )
}

export default MessagesList