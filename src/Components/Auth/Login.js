import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Styles from './Login.module.css';
import { login } from '../../services/authServices';

const Login = () => {
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const emailValidator = (e) => {
    const email = e.target.value.trim();
    setEmailErr(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email));
  };

  const passwordValidator = (e) => {
    const password = e.target.value.trim();
    setPasswordErr(password.length === 0);
  };

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
      errorMessage.push('Email is required');
    }

    if (user.password.length === 0) {
      setPasswordErr(true);
      errorMessage.push('Password is required');
    }

    if (errorMessage.length !== 0) {
      return console.log(errorMessage.join(', ') + '!');
    }

    const loggedUser = await login(user);
    console.log(loggedUser);
  };

  return (
    <section className={Styles.container}>
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
            onChange={emailValidator}
          />
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
            onChange={passwordValidator}
          />
        </div>

        <div className="mb-3">
          <p>
            Don't have an account?&nbsp;
            <Link to="/register" className={Styles.link}>
              Register&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
            </Link>
          </p>
        </div>

        <button type="submit" className={`${Styles.btn} btn btn-primary`}>
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
