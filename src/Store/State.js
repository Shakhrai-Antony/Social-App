/*
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

const store = {
    getState() {
        return this._appState
    },
    _rerenderEntireTree() {
        console.log('state changed')
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer
    },
    _appState: {
        profilePage: {
            messages: [
                {id: 1, message: 'Why nobody loves me?', likesCount: 1},
                {id: 2, message: 'Is anyone here?', likesCount: 1}
            ],
            newMessage: ''
        },
        dialogsPage: {
            users: [
                {id: 1, name: 'Andrew'},
                {id: 2, name: 'Semen'},
                {id: 3, name: 'Antony'}
            ],
            dialogs: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'How is your day?'}
            ],
            messages: [
                {id: 1, message: 'hello'}
            ],
            newDialogMessage: ''
        }
    },
    dispatch(action) {
        this._appState.profilePage = profileReducer(this._appState.profilePage, action);
        this._appState.dialogsPage = dialogsReducer(this._appState.dialogsPage, action);
        this._rerenderEntireTree(this._appState)

    },

}


export default store;*/
