import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name="newPostText"
                    component={Textarea}
                    placeholder="add post"
                    validate={[required, maxLength10]}
                />
            </div>
            <button>Add post</button>
        </form>
    );
};

let AddNewPostFormRedux = reduxForm({
    form: 'ProfileaddNewPostForm',
})(AddNewPostForm);

// class MyPosts extends React.PureComponent {
//     // shouldComponentUpdate(nextProps, nextState) {
//     //     return nextProps !== this.props || nextState !== this.state;
//     // }
//     render() {
//         console.log('RENDER');

//         let postsElements = this.props.posts.map((elem) => (
//             <Post message={elem.message} likesCount={elem.likesCount} key={elem.id} />
//         ));

//         const onAddPost = (values) => {
//             this.props.addPost(values.newPostText);
//         };

//         return (
//             <div className={styles.posts_block}>
//                 <h3>My posts</h3>
//                 <AddNewPostFormRedux onSubmit={onAddPost} />
//                 <div className={styles.posts}>{postsElements}</div>
//             </div>
//         );
//     }
// }

const MyPosts = React.memo((props) => {
    console.log('RENDER');

    let postsElements = props.posts.map((elem) => (
        <Post message={elem.message} likesCount={elem.likesCount} key={elem.id} />
    ));

    const onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={styles.posts_block}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className={styles.posts}>{postsElements}</div>
        </div>
    );
});

export default MyPosts;
