const SEND_MESSAGE = 'SEND-MESSAGE';

// --- type
type MessageType = {
  id: number;
  message: string;
};

type DialogType = {
  id: number;
  name: string;
};

let initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'Buy' },
    { id: 3, message: 'Welcome' },
  ] as Array<MessageType>,

  dialogs: [
    { id: 1, name: 'Dima' },
    { id: 2, name: 'Sasha' },
    { id: 3, name: 'Victor' },
    { id: 4, name: 'Andrey' },
    { id: 5, name: 'Sveta' },
  ] as Array<DialogType>,
};

// --- type
export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };
    }
    default:
      return state;
  }
};

// --- type
type SendMessageActionType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessage = (newMessageBody: string): SendMessageActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
