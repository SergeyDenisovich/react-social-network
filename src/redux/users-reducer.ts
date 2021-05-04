import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';

import { UserType } from '../types/type';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FITCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users id
};

export type InitialStateType = typeof initialState;
type ActionsType =
  | FollowSuccessActionType
  | UnfollowSuccessActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalUsersCountActionType
  | ToggleIsFetchingActionType
  | ToggleFollowingProgressActionType;

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
        // users: state.users.map((user) => {
        //     if (user.id === action.userId) {
        //         return { ...user, followed: true };
        //     }
        //     return user;
        // }),
      };
    }

    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
      };
    }

    case SET_USERS: {
      return { ...state, users: action.users };
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }

    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }

    default:
      return state;
  }
};

type FollowSuccessActionType = {
  type: typeof FOLLOW;
  userId: number;
};
export const followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userId,
});

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

// ===== thunk creators
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {
  let state = getState().app;
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));
  let data = await usersAPI.getUsers(currentPage, pageSize);

  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
  dispatch(toggleIsFetching(false));
};

const _followunfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType
) => {
  dispatch(toggleFollowingProgress(true, userId));
  let data = await apiMethod(userId);

  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
  let apiMethod = usersAPI.follow.bind(usersAPI);
  _followunfollowFlow(dispatch, userId, apiMethod, followSuccess);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  let apiMethod = usersAPI.unfollow.bind(usersAPI);
  _followunfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
};

export default usersReducer;
