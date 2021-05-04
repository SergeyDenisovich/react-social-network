import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={`${styles.item} ${styles.active}`}>
                <NavLink to="/profile" activeClassName={styles.active}>
                    Profile
                </NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/dialogs" activeClassName={styles.active}>
                    Messages
                </NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/users" activeClassName={styles.active}>
                    Users
                </NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="#3">News</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="#4">Music</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="#5">Settings</NavLink>
            </div>
            <div className={styles.item}>
                <div>
                    <h3>Friends</h3>
                    <div></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
