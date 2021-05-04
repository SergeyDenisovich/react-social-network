// import React from 'react';
import { connect } from 'react-redux';

import { sendMessage } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

// compose(
//     connect(mapStateToProps, {
//         updateNewMessageBody,
//         sendMessage,
//     }),
//     withAuthRedirect,
// )(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, {
//     updateNewMessageBody,
//     sendMessage,
// })(AuthRedirectComponent);

export default compose(
    connect(mapStateToProps, {
        sendMessage,
    }),
    withAuthRedirect,
)(Dialogs);
