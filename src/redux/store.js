import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'How are you?', likesCount: 23 },
                { id: 2, message: 'Fine!', likesCount: 0 },
            ],

            newPostText: 'Samurai-road',
        },
        dialogsPage: {
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'Buy' },
                { id: 3, message: 'Welcome' },
            ],

            dialogs: [
                { id: 1, name: 'Dima' },
                { id: 2, name: 'Sasha' },
                { id: 3, name: 'Victor' },
                { id: 4, name: 'Andrey' },
                { id: 5, name: 'Sveta' },
            ],

            newMessageBody: '',
        },
        sidebar: {
            friends: [
                { id: 1, name: 'Dima' },
                { id: 2, name: 'Sasha' },
                { id: 3, name: 'Victor' },
                { id: 4, name: 'Andrey' },
                { id: 5, name: 'Sveta' },
            ],
        },
    },

    _callSubscriber() {
        console.log('state was changed');
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    },
};

export default store;
window.store = store;
