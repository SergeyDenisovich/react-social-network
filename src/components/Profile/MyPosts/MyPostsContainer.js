// import React from 'react';
import { addPost } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';

import MyPosts from './MyPosts';
// import StoreContext from '../../../StoreContext';

// const MyPostsContainer = (props) => {
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState();

//                 const addPost = () => {
//                     store.dispatch(addPostActionCreator());
//                 };

//                 const onPostChange = (text) => {
//                     let action = updateNewPostTextActionCreator(text);
//                     store.dispatch(action);
//                 };

//                 return (
//                     <MyPosts
//                         updateNewPostText={onPostChange}
//                         addPost={addPost}
//                         posts={state.profilePage.posts}
//                         newPostText={state.profilePage.newPostText}
//                     />
//                 );
//             }}
//         </StoreContext.Consumer>
//     );
// };

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    };
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewPostText: (text) => {
//             let action = updateNewPostTextActionCreator(text);
//             dispatch(action);
//         },

//         addPost: () => {
//             dispatch(addPostActionCreator());
//         },
//     };
// };

const MyPostsContainer = connect(mapStateToProps, {
    addPost,
})(MyPosts);

export default MyPostsContainer;
