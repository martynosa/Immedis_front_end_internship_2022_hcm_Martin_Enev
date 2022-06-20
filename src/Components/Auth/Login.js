import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Styles from './Login.module.css';
import { login } from '../../services/authServices';
import { useAuth } from '../../AuthContext';

// notification
import Notification from '../Common/Notification';
import FormError from '../Common/FormError';

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

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

  // validation
  const emailValidator = (e) => {
    const email = e.target.value.trim();
    setEmailErr(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email));
  };

  const passwordValidator = (e) => {
    const password = e.target.value.trim();
    setPasswordErr(password.length === 0);
  };

  // submit
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = {
      email: formData.get('email').trim(),
      password: formData.get('password').trim(),
    };

    let errorMessage = [];

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.email)) {
      setEmailErr(true);
      errorMessage.push('Valid email is required');
    }

    if (user.password.length === 0) {
      setPasswordErr(true);
      errorMessage.push('Password is required');
    }

    if (errorMessage.length !== 0) {
      openNotification('fail', errorMessage.join(', ') + '!');
      return;
    }

    try {
      const loggedUser = await login(user);
      setUser(loggedUser);
      openNotification('success', `Welcome ${loggedUser.fullName}.`);
      loggedUser.role === 'hr' ? navigate('/employees') : navigate('/profile');
    } catch (error) {
      openNotification('fail', error);
    }
  };

  return (
    <>
      {notificationSettings.state && (
        <Notification
          status={notificationSettings.status}
          message={notificationSettings.message}
        />
      )}
      <form className={Styles.form} onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className={
              emailErr
                ? `${Styles.error} ${Styles.inputs} form-control`
                : `${Styles.inputs} form-control`
            }
            id="email"
            name="email"
            onBlur={emailValidator}
          />
          {emailErr && <FormError message={'Valid email is required!'} />}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={
              passwordErr
                ? `${Styles.error} ${Styles.inputs} form-control`
                : `${Styles.inputs} form-control`
            }
            id="password"
            name="password"
            onBlur={passwordValidator}
          />
          {passwordErr && <FormError message={'Password is required!'} />}
        </div>

        <div className="mb-3">
          <p>
            Don't have an account?&nbsp;
            <Link to="/register" className={Styles.link}>
              Register&nbsp;<ion-icon name="arrow-round-forward"></ion-icon>
            </Link>
          </p>
        </div>

        <button type="submit" className={`${Styles.btn} btn btn-primary`}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
