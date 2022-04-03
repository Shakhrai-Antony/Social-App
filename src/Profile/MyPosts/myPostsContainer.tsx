import React from "react";
import {
    messagesType,
    profileReducerActions, profileReducerDispatchType,
} from "../../Store/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {appStateType} from "../../Store/reduxStore";

const MyPostsContainer: React.FC<MyPostsContainerPropsType> = (props) => {
    return (
        <MyPosts {...props}/>
    )
}

type MyPostsContainerPropsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    messages: Array<messagesType>
    newMessage: string
}

const mapStateToProps = (state: any): mapStateToPropsType => {
    return {
        messages: state.profilePage.messages,
        newMessage: state.profilePage.newMessage
    } as mapStateToPropsType
}

type mapDispatchToPropsType = {
    changePost: (text: string) => void
    newPost: () => void
}

const mapDispatchToProps = (dispatch: profileReducerDispatchType): mapDispatchToPropsType => {
    return {
        changePost: (text) => {
            dispatch(profileReducerActions.updateNewPostActionCreator(text))
        },
        newPost: () => {
            dispatch(profileReducerActions.addPostActionCreator())
        }
    }
}
export default connect<mapStateToPropsType,mapDispatchToPropsType>
(mapStateToProps, mapDispatchToProps)
(MyPostsContainer)
