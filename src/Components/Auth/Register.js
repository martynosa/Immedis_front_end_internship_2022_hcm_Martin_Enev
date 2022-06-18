import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Styles from './Register.module.css';

const Register = () => {
  const [emailErr, setEmailErr] = useState(false);
  const [fullNameErr, setFullNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [rePasswordErr, setRePasswordErr] = useState(false);

  const [passToCompare, setPassToCompare] = useState('');

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

  const submitHandler = (e) => {
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
      errorMessage.push('Email is required');
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
      return console.log(errorMessage.join(', ') + '!');
    }

    console.log('posted');
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
              emailErr ? `${Styles.error} form-control` : 'form-control'
            }
            id="email"
            name="email"
            onChange={emailValidator}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full name
          </label>
          <input
            type="text"
            className={
              fullNameErr ? `${Styles.error} form-control` : 'form-control'
            }
            id="fullName"
            name="fullName"
            onChange={fullNameValidator}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={
              passwordErr ? `${Styles.error} form-control` : 'form-control'
            }
            id="password"
            name="password"
            onChange={passwordValidator}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rePassword" className="form-label">
            Repeat Password
          </label>
          <input
            type="password"
            className={
              rePasswordErr ? `${Styles.error} form-control` : 'form-control'
            }
            id="rePassword"
            name="rePassword"
            onChange={rePasswordValidator}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select id="role" className="form-select" name="role">
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
          </select>
        </div>

        <div className="mt-5">
          <p>
            Already registered?{' '}
            <Link to="/login" className={Styles.link}>
              Login{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
            </Link>
          </p>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
