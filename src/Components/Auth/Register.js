import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { register } from '../../services/authServices';
import { useAuth } from '../../AuthContext';
import { useNotification } from '../../NotificationContext';
import FormError from '../Common/FormError';
import Button from '../Common/Button';

const Register = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const { openNotification } = useNotification();

  const [emailErr, setEmailErr] = useState(false);
  const [fullNameErr, setFullNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [rePasswordErr, setRePasswordErr] = useState(false);
  const [passToCompare, setPassToCompare] = useState('');
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  // validation
  const emailValidator = (e) => {
    const email = e.target.value.trim();
    setEmailErr(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email));
  };

  const fullNameValidator = (e) => {
    const fullName = e.target.value.trim();
    setFullNameErr(fullName.length < 3);
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

    if (user.fullName.length < 3) {
      setFullNameErr(true);
      errorMessage.push('Full name must be at least 3 characters');
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
      setIsLoadingBtn(true);
      const registeredUser = await register(user);
      setUser(registeredUser);
      openNotification('success', `Welcome ${registeredUser.fullName}.`);
      setIsLoadingBtn(false);
      registeredUser.role === 'hr'
        ? navigate('/employees')
        : navigate('/profile');
    } catch (error) {
      openNotification('fail', error);
      setIsLoadingBtn(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="form register-form" onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className={
              emailErr
                ? 'error register-inputs form-control'
                : 'register-inputs form-control'
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
                ? 'error register-inputs form-control'
                : 'register-inputs form-control'
            }
            id="fullName"
            name="fullName"
            onBlur={fullNameValidator}
          />
          {fullNameErr && (
            <FormError message={'Full name must be at least 3 characters!'} />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={
              passwordErr
                ? 'error register-inputs form-control'
                : 'register-inputs form-control'
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
                ? 'error register-inputs form-control'
                : 'register-inputs form-control'
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
          <select id="role" className="register-inputs form-select" name="role">
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div className="mt-5">
          <p>
            Already registered?&nbsp;
            <Link to="/login" className="link">
              <ion-icon name="arrow-round-back"></ion-icon>&nbsp;Login
            </Link>
          </p>
        </div>

        <Button
          isLoading={isLoadingBtn}
          color={'primary'}
          text={'Register'}
          type={'submit'}
        />
      </form>
    </div>
  );
};

export default Register;
