import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../AuthContext';
import { getEmployee, deleteEmployee } from '../services/employeesServices';
import { PHOTO_URL } from '../services/constants';
import {
  capitalizeFirstLetter,
  dateString,
  slugify,
} from '../services/helpers';
import Styles from './Details.module.css';

const Details = ({ openNotification }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const deleteHandler = async (e) => {
    e.preventDefault();

    try {
      await deleteEmployee(user.token, employee._id);
      openNotification('success', `${employee.fullName} deleted successfully.`);
      navigate('/employees');
    } catch (error) {
      openNotification('fail', error.message);
    }
  };

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
    <>
      <div className={`${Styles.container} py-4 mt-3`}>
        <header className={`${Styles.header} pb-3 mb-3 border-bottom`}>
          <div className={Styles.fullName}>
            <img
              className={Styles.photo}
              src={`${PHOTO_URL}/${employee.photo}`}
              alt="employee's mugshot"
            ></img>
            <span className="fs-4">{employee.fullName}</span>
          </div>
          <div className={Styles.btnGroup}>
            <Link
              className="btn btn-primary"
              to={`/employees/${slugify(employee.fullName)}/update`}
              state={employee._id}
            >
              Update
            </Link>
            {user.role === 'hr' && user._id !== employee._id && (
              <button
                className="btn btn-danger"
                type="button"
                onClick={deleteHandler}
              >
                Delete
              </button>
            )}
          </div>
        </header>

        <div className="p-5 mb-4 rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold mb-3">General</h1>
            <p className="col-md-8 fs-4">
              Gender: {capitalizeFirstLetter(employee.gender)}
            </p>
            <p className="col-md-8 fs-4">
              Birth date: {dateString(employee.birthDate)}
            </p>
            <p className="col-md-8 fs-4">Phone number: {employee.phone}</p>
            <p className="col-md-8 fs-4">Address: {employee.address}</p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-7">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2 className="mb-3">Employment</h2>
              <p>Hired on: {dateString(employee.entryDate)}</p>
              <p>Employment Type: {employee.employmentType}</p>
              <p>Department: {employee.department}</p>
              <p>Job title: {employee.jobTitle}</p>
              <p>Salary: {employee.salary} BGN</p>
            </div>
          </div>
          <div className="col-md-5">
            <div className="h-100 p-5 rounded-3">
              <h2 className="mb-3">Leave request</h2>
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="leaveFrom" className="form-label">
                    From
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className="form-control"
                      id="leaveFrom"
                      name="leaveFrom"
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="leaveTo" className="form-label">
                    To
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className="form-control"
                      id="leaveTo"
                      name="leaveTo"
                    />
                  </div>
                </div>
              </div>

              <button className="btn btn-primary w-100 mt-5" type="button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
