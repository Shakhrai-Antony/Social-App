import React from "react";
import Post from "../Post/Post";
import {messagesType} from "../../Store/profileReducer";
import TextArea from "antd/lib/input/TextArea";
import { Button } from "antd";

type MyPostsType = {
    newMessage: string
    messages: Array<messagesType>
    changePost: (text: string) => void
    newPost: () => void
}

const MyPosts: React.FC<MyPostsType> = (props) => {

    const onChangePost = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        props.changePost(e.currentTarget.value)
    }

    const addNewPost = () => {
        props.newPost()
    }

    const messagesList = props.messages.map((message) =>
        <Post key={message.id} id={message.id} message={message.message} likesCount={message.likesCount}/>
    )

    return (
        <div>
            <div>
                <TextArea showCount maxLength={100} style={{ height: 80, width: 200 }} onChange={onChangePost} value={props.newMessage}/>
            </div>
            <div>
                <Button onClick={addNewPost}>Add Posts</Button>
            </div>
            {messagesList}
        </div>
    )
}

export default MyPosts