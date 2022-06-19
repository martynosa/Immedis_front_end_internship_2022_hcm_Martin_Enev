import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Styles from './Navbar.module.css';
import { useAuth } from '../../AuthContext';

// notification
import Notification from '../Common/Notification';

const Navbar = () => {
  const { user, setUser, isAuth } = useAuth();

  // notification
  const [notificationSettings, setNotificationSettings] = useState({
    state: false,
    status: 'fail',
    message: '',
  });

  const openNotification = (status, message) => {
    setNotificationSettings({ state: true, status, message });
    setTimeout(() => {
      setNotificationSettings({ state: false, status, message });
    }, 2000);
  };

  const logoutHandler = () => {
    try {
      setUser({});
      localStorage.clear();
      openNotification('success', 'Logout successful.');
    } catch (error) {
      openNotification({ status: 'fail', message: error });
    }
  };

  const userBtns = (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/employees">
            Employees
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
      </ul>

      <ul className={`${Styles.userBar} navbar-nav`}>
        <li className={`${Styles.fullName}`}>
          <ion-icon name="person"></ion-icon>
          {user.fullName}
        </li>
        <li>
          <span className={`${Styles.logout} nav-link`} onClick={logoutHandler}>
            Logout
          </span>
        </li>
      </ul>
    </>
  );

  const guestBtns = (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <nav className={`${Styles.myNav} navbar navbar-expand-lg`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/landing">
            HRM
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isAuth && userBtns}
            {!isAuth && guestBtns}
          </div>
        </div>
      </nav>
      {notificationSettings.state && (
        <Notification
          status={notificationSettings.status}
          message={notificationSettings.message}
        />
      )}
    </>
  );
};

export default Navbar;
