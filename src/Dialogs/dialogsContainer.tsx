import React, {useEffect} from "react";
import Dialogs from "./Dialogs";
import {
    dialogsReducerActions, dialogsReducerActionType,
    dialogsType,
    usersType
} from "../Store/dialogsReducer";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {appStateType} from "../Store/reduxStore";

const DialogsContainer: React.FC<PropsType> = (props) => {
    return (
        <Dialogs {...props}/>
        )

}

type PropsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    users: Array<usersType>
    dialogs: Array<dialogsType>
    newDialogMessage: string
    isAuth: boolean
}

type mapDispatchToPropsType = {
    changeNewMessage: (text: string) => void,
    newDialog: () => void
}

let mapStateToProps = (state: appStateType): mapStateToPropsType => {
    return {
        users: state.dialogsPage.users,
        dialogs: state.dialogsPage.dialogs,
        newDialogMessage: state.dialogsPage.newDialogMessage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
    return {
        changeNewMessage: (text) => {
            dispatch(dialogsReducerActions.updateNewDialogActionCreator(text))
        },
        newDialog: () => {
            dispatch(dialogsReducerActions.addNewDialogActionCreator())
        }
    }
}

const loginDialogsRedirect = (props:any) => {
    let navigate = useNavigate()
    useEffect(() => {
        if (!props.isAuth) {
            return navigate('/Login')
        }
    })
    return <DialogsContainer {...props} />
}

export default connect<mapStateToPropsType,mapDispatchToPropsType,appStateType>
    // @ts-ignore
(mapStateToProps, mapDispatchToProps)
(loginDialogsRedirect)

