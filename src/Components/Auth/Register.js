import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Styles from './Register.module.css';
import { register } from '../../services/authServices';
import { useAuth } from '../../AuthContext';

// notification
import Notification from '../Common/Notification';
import FormError from '../Common/FormError';

const Register = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [emailErr, setEmailErr] = useState(false);
  const [fullNameErr, setFullNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [rePasswordErr, setRePasswordErr] = useState(false);

  const [passToCompare, setPassToCompare] = useState('');

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

  const fullNameValidator = (e) => {
    const fullName = e.target.value.trim();
    setFullNameErr(fullName.length === 0);
  };

  const passwordValidator = (e) => {
    const password = e.target.value.trim();
    setPassToCompare(password);
    setPasswordErr(password.length < 6);
  };

  const rePasswordValidator = (e) => {
    const rePassword = e.target.value.trim();
    setRePasswordErr(passToCompare !== rePassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      email: formData.get('email').trim(),
      fullName: formData.get('fullName').trim(),
      password: formData.get('password').trim(),
      rePassword: formData.get('rePassword').trim(),
      role: formData.get('role'),
    };

    let errorMessage = [];
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.email)) {
      setEmailErr(true);
      errorMessage.push('Valid email is required');
    }

    if (user.fullName.length === 0) {
      setFullNameErr(true);
      errorMessage.push('Full name is required');
    }

    if (user.password.length < 6) {
      errorMessage.push('Password must be at least 6 characters');
      setPasswordErr(true);
    }

    if (
      user.password !== user.rePassword ||
      passToCompare.trim().length === 0
    ) {
      errorMessage.push('Repeat password must be identical to the password');
      setRePasswordErr(true);
    }

    if (errorMessage.length !== 0) {
      openNotification('fail', errorMessage.join(', ') + '!');
      return;
    }

    try {
      const registeredUser = await register(user);
      setUser(registeredUser);
      openNotification('success', `Welcome ${registeredUser.fullName}.`);
      // this needs to be removed and page waiting approval shown
      registeredUser.role === 'hr'
        ? navigate('/employees')
        : navigate('/profile');
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
          <label htmlFor="fullName" className="form-label">
            Full name
          </label>
          <input
            type="text"
            className={
              fullNameErr
                ? `${Styles.error} ${Styles.inputs} form-control`
                : `${Styles.inputs} form-control`
            }
            id="fullName"
            name="fullName"
            onBlur={fullNameValidator}
          />
          {fullNameErr && <FormError message={'Full name is required!'} />}
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
          <label htmlFor="rePassword" className="form-label">
            Repeat Password
          </label>
          <input
            type="password"
            className={
              rePasswordErr
                ? `${Styles.error} ${Styles.inputs} form-control`
                : `${Styles.inputs} form-control`
            }
            id="rePassword"
            name="rePassword"
            onBlur={rePasswordValidator}
          />
          {rePasswordErr && (
            <FormError
              message={'Repeat password must be identical to the password!'}
            />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            id="role"
            className={`${Styles.inputs} form-select`}
            name="role"
          >
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div className="mt-5">
          <p>
            Already registered?&nbsp;
            <Link to="/login" className={Styles.link}>
              <ion-icon name="arrow-round-back"></ion-icon>&nbsp;Login
            </Link>
          </p>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
