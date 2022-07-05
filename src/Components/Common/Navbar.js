import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Styles from './Navbar.module.css';
import { useAuth } from '../../AuthContext';
import { PHOTO_URL } from '../../services/constants';

const Navbar = ({ openNotification }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth();

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

  const landingNav = (
    <nav className={Styles.landingNav}>
      <a
        className={Styles.landingLink}
        href="https://www.linkedin.com/in/martynosa/"
        target="_blank"
      >
        <ion-icon name="logo-linkedin"></ion-icon>
        LinkedIn
      </a>
      <a
        className={Styles.landingLink}
        href="https://github.com/martynosa/"
        target="_blank"
      >
        <ion-icon name="logo-github"></ion-icon>
        Github
      </a>
      <a
        className={Styles.landingLink}
        href="https://martynosa-react-weather.netlify.app/"
        target="_blank"
      >
        <ion-icon name="partly-sunny"></ion-icon>
        Weather
      </a>
      <a
        className={Styles.landingLink}
        href="https://martynosa-sharingan.netlify.app/"
        target="_blank"
      >
        <ion-icon name="eye"></ion-icon>
        Sharingan
      </a>
    </nav>
  );

  const authNav = (
    <nav className={Styles.landingNav}>
      <Link className={`${Styles.landingLink} ${Styles.hrLink}`} to="/">
        <ion-icon name="arrow-back"></ion-icon>
        Landing
      </Link>
    </nav>
  );

  const innerNav = (
    <nav className={`${Styles.myNav} navbar navbar-expand-lg`}>
      <div className="container-fluid">
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
              <span
                className={`${Styles.logout} btn btn-danger btn-sm`}
                onClick={logoutHandler}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  if (location.pathname === '/') return landingNav;

  if (location.pathname === '/login' || location.pathname === '/register')
    return authNav;

  return innerNav;
};

export default Navbar;
