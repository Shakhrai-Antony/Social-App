import React from "react";
import Post from "../Post/Post";
import {messagesType, profileReducerActions} from "../../Store/profileReducer";
import TextArea from "antd/lib/input/TextArea";
import { Button } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, getNewMessage} from "../../Store/profileSelectors";


export const MyPosts: React.FC = (props) => {

    const messages = useSelector(getMessages)
    const newMessage = useSelector(getNewMessage)
    const dispatch = useDispatch()
    const onChangePost = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(profileReducerActions.updateNewPostActionCreator(e.currentTarget.value))
    }
    const addNewPost = () => {
        dispatch(profileReducerActions.addPostActionCreator())
    }
    const messagesList = messages.map((message) =>
        <Post key={message.id} id={message.id} message={message.message} likesCount={message.likesCount}/>
    )

    return (
        <div>
            <div>
                <TextArea showCount maxLength={100} style={{ height: 80, width: 200 }} onChange={onChangePost} value={newMessage}/>
            </div>
            <div>
                <Button onClick={addNewPost}>Add Posts</Button>
            </div>
            {messagesList}
        </div>
    )
}
