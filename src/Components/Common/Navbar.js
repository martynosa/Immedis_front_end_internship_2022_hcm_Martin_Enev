import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Styles from './Navbar.module.css';
import { useAuth } from '../../AuthContext';
import { PHOTO_URL } from '../../services/constants';

const Navbar = ({ openNotification }) => {
  const navigate = useNavigate();

  const { user, setUser, isAuth } = useAuth();

  const logoutHandler = () => {
    try {
      setUser({});
      localStorage.clear();
      openNotification('success', 'Logout successful.');
      navigate('/login');
    } catch (error) {
      openNotification({ status: 'fail', message: error });
    }
  };

  const userBtns = (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`${Styles.links} nav-link`} to="/employees">
            <ion-icon name="list"></ion-icon>
            Employees
          </Link>
        </li>

        <li className="nav-item">
          <Link className={`${Styles.links} nav-link`} to="/profile">
            <ion-icon name="person"></ion-icon>
            Profile
          </Link>
        </li>
      </ul>

      <ul className={`${Styles.userBar} navbar-nav`}>
        <li className={Styles.userInfo}>
          <img
            className={Styles.photo}
            src={`${PHOTO_URL}/${user.photo}`}
            alt="employee's mugshot"
          ></img>
          {user.fullName}
        </li>
        <li>
          <span className={`${Styles.logout} nav-link`} onClick={logoutHandler}>
            <ion-icon name="log-out"></ion-icon>
            Logout
          </span>
        </li>
      </ul>
    </>
  );

  const guestBtns = (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className={`${Styles.links} nav-link`} to="/login">
          <ion-icon name="log-in"></ion-icon>
          Login
        </Link>
      </li>

      <li className="nav-item">
        <Link className={`${Styles.links} nav-link`} to="/register">
          <ion-icon name="person"></ion-icon>
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className={`${Styles.myNav} navbar navbar-expand-lg`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/landing">
          Human resource LTD.
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
  );
};

export default Navbar;
