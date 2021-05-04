import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS';

// --- type
export type InitialState = {
  initialized: boolean;
  globalError: any;
};

let initialState: InitialState = {
  initialized: false,
  globalError: null,
};

const appReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

// --- type
export type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch: Function) => {
  let promise = dispatch(getAuthUserData());
  //   debugger;
  Promise.all([promise]).then(() => {
    // debugger;
    dispatch(initializedSuccess());
  });
};

export default appReducer;
