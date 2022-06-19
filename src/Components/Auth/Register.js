import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../services/authServices';

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

    console.log(user);
    const registeredUser = await register(user);
    console.log(registeredUser);
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
            onBlur={emailValidator}
          />
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
    </section>
  );
};

export default Register;
