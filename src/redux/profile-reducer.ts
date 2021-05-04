import { stopSubmit } from 'redux-form';
import { usersAPI, profileAPI } from '../api/api';

import { PostType, PhotosType, ProfileType } from '../types/type';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

let initialState = {
  posts: [
    { id: 1, message: 'How are you?', likesCount: 23 },
    { id: 2, message: 'Fine!', likesCount: 0 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: '',
};

// --- typing
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        } as ProfileType, // !!! в процессе лучше такого не делать !!!!!!!!!!!!!!!!!
      };
    }
    default:
      return state;
  }
};

// --- typing
type AddPostActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPost = (newPostText: string): AddPostActionType => ({
  type: ADD_POST,
  newPostText,
});

// --- typing
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});

// --- typing
type setStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): setStatusActionType => ({
  type: SET_STATUS,
  status,
});

// --- typing
type DeletePostAcionType = {
  type: typeof DELETE_POST;
  postId: number;
};
export const deletePost = (postId: number): DeletePostAcionType => ({
  type: DELETE_POST,
  postId,
});

// --- typing
type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

// ============== thunk creators
export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let data = await usersAPI.getProfile(userId);

  dispatch(setUserProfile(data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let data = await profileAPI.getStatus(userId);

  dispatch(setStatus(data.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let data = await profileAPI.updateStatus(status);

    if (data.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    alert(error);
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: Function) => {
  // get userId from auth-reducer
  const userId = getState().auth.userId;

  const data = await profileAPI.saveProfile(profile);

  if (data.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    debugger;
    // нужно парсить для каждого поля текст ошибки
    // dispatch(stopSubmit('edit-profile', { contacts: { facebook: data.data.messages[0] } }));
    dispatch(stopSubmit('edit-profile', { _error: data.data.messages[0] }));

    // вернем назад Промис и передадим в реджект(ОШИБКА !!!) инфу
    return Promise.reject(data.data.messages[0]);
  }
};

export default profileReducer;
