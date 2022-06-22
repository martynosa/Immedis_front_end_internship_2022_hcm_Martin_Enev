import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Styles from './Update.module.css';
import { getEmployee } from '../services/employeesServices';
import { useAuth } from '../AuthContext';

const Update = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEmployee(user.token, location.state).then((empl) => {
      setEmployee(empl);
      setIsLoading(false);
    });
  }, [user.token, location.state]);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`${Styles.container} py-4 mt-3`}>
      <header className="pb-3 mb-3 border-bottom">
        <div className={Styles.fullName}>
          <ion-icon name="person" style={{ fontSize: '24px' }}></ion-icon>
          <span className="fs-4">{employee.fullName}</span>
        </div>
      </header>
      <form>
        <div className="row g-3">
          <div className="col-sm-4">
            <label htmlFor="fullName" className="form-label">
              Full name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              defaultValue="Martin"
            />
          </div>

          <div className="col-sm-4">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select className="form-control" id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="col-4">
            <label htmlFor="birthDate" className="form-label">
              Birth date
            </label>
            <div className="input-group mb-3">
              <input type="date" className="form-control" id="birthDate" />
            </div>
          </div>

          <div className="col-4">
            <label htmlFor="phone" className="form-label">
              Phone number
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">+359</span>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="888888888"
              />
            </div>
          </div>

          <div className="col-8">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              defaultValue="Varna"
            />
          </div>

          <hr className="my-5" />

          <div className="col-4">
            <label htmlFor="birthDate" className="form-label">
              Entry date
            </label>
            <div className="input-group mb-3">
              <input type="date" className="form-control" id="birthDate" />
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="employmentType" className="form-label">
              Employment type
            </label>
            <select className="form-select" id="employmentType">
              <option value="fullTime">Full time</option>
              <option value="intern">Intern</option>
              <option value="partTime">Part time</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select className="form-select" id="department">
              <option value="humanResource">Human resource</option>
              <option value="accounting">Accounting</option>
              <option value="sales">Sales</option>
              <option value="it">IT</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="jobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              defaultValue="Developer"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                BGN
              </span>
              <input
                type="number"
                className="form-control"
                id="salary"
                defaultValue="1500"
              />
            </div>
          </div>
        </div>

        <hr className="my-5" />

        <button className="w-100 btn btn-primary btn-lg" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
