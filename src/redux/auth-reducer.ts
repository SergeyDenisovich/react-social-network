import { authAPI, EnumResultCode, ResultCodeForCapcha, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS';

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

// --- type
export type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadDataType;
};

export type SetAuthUserDataActionPayloadDataType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
});

// --- type
type GetCaptchaUrlSuccessActiveType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string }; // -- указание типа на ходу (иногда используется!!!)
};

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActiveType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {
    captchaUrl,
  },
});

export const getAuthUserData = () => async (dispatch: any) => {
  let data = await authAPI.me(); // придут данные из DAL (ответ сервера)
  // debugger;

  if (data.resultCode === EnumResultCode.Success) {
    let { id, login, email } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (
  dispatch: any
) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);

  if (response.resultCode === EnumResultCode.Success) {
    dispatch(getAuthUserData());
  } else {
    // в случае введения неверного пароля или логина несколько раз подряд (resultCode === 10) создаем капчу
    if (response.resultCode === ResultCodeForCapcha.CapchaIsRequired) {
      dispatch(getCaptchaUrl());
    }

    let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
    dispatch(stopSubmit('login', { _error: message }));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();

  const captchaUrl = response.data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
