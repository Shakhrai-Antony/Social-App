import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import { setLogOutUserThunkCreator} from "../Store/authReducer";
import {appStateType} from "../Store/reduxStore";

const HeaderContainer: React.FC<propsType> = (props) => {
        return (
            <Header {...props} setLogOutUserThunkCreator={props.setLogOutUserThunkCreator}/>
        )
}

type propsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    login: string | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    setLogOutUserThunkCreator: () => void
}

let mapStateToProps = (state: appStateType): mapStateToPropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect<mapStateToPropsType,mapDispatchToPropsType,appStateType>
    // @ts-ignore
(mapStateToProps, {setLogOutUserThunkCreator})
(HeaderContainer)