import React from "react";
// @ts-ignore
import s from "../Dialogs.module.css";


type messagesList = {
    message: string
    id?: number
}


const MessagesList: React.FC<messagesList> = (props) => {
    return (
        <div className={s.messagesItem}>
            {props.message}
        </div>
    )
}





export default MessagesList