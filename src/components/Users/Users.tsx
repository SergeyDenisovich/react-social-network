import React from 'react';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

import { UserType } from '../../types/type';

// ПРИ РАЗРАБОТКЕ И ИСПОЛЬЗОВАНИИ history.push в path прописать --- developers
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

type PropTypes = {
  currentPage: number;
  totalUsersCount: number;
  pageSize: number;
  onPageChanged: (pageNumber: number) => void;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

const Users: React.FC<PropTypes> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
  //  ...props contain: followingInProgress, follow, unfollow

  return (
    <div className={styles.users_container}>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            followingInProgress={props.followingInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
