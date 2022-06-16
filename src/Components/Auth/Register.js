import React from 'react';
import { Link } from 'react-router-dom';

import Styles from './Register.module.css';

const Register = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const user = {
      email: formData.get('email'),
      fullName: formData.get('fullName'),
      password: formData.get('password'),
      rePassword: formData.get('rePassword'),
      role: formData.get('role'),
    };
    console.log(user);
  };

  return (
    <section className={Styles.container}>
      <form className={Styles.form} onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="text" className="form-control" id="email" name="email" />
        </div>

        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rePassword" className="form-label">
            Repeat Password
          </label>
          <input
            type="password"
            className="form-control"
            id="rePassword"
            name="rePassword"
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
