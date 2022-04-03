import React from "react";
import Post from "../Post/Post";
import {messagesType} from "../../Store/profileReducer";

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
                <textarea onChange={onChangePost} value={props.newMessage}/>
            </div>
            <div>
                <button onClick={addNewPost}>Add Posts</button>
            </div>
            {messagesList}
        </div>
    )
}

export default MyPosts