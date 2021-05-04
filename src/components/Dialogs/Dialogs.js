import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import styles from './Dialogs.module.css';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((elem) => (
        <DialogItem name={elem.name} id={elem.id} key={elem.id} />
    ));

    let messagesElements = state.messages.map((elem) => (
        <Message message={elem.message} key={elem.id} />
    ));

    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>{dialogsElements}</div>
            <div className={styles.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
    );
};

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    validate={[required, maxLength50]}
                    name="newMessageBody"
                    placeholder="Enter your messages"
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
};

const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessageForm',
})(AddMessageForm);

export default Dialogs;
