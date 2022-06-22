import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../AuthContext';
import { getEmployee } from '../services/employeesServices';
import { slugify } from '../services/helpers';
import Styles from './Details.module.css';

const Details = () => {
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
    <>
      <div className={`${Styles.container} py-4 mt-3`}>
        <header className={`${Styles.header} pb-3 mb-3 border-bottom`}>
          <div className={Styles.fullName}>
            <ion-icon name="person" style={{ fontSize: '24px' }}></ion-icon>
            <span className="fs-4">{employee.fullName}</span>
          </div>
          <Link
            className="btn btn-primary"
            to={`/employees/${slugify(employee.fullName)}/update`}
            state={employee._id}
          >
            Update
          </Link>
        </header>

        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">General</h1>
            <p className="col-md-8 fs-4">
              {/* General info will be here with photo + upload photo on the left and general info on the right */}
              photo/uploadPhoto + name/address/ ...
            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Employment</h2>
              <p>
                {/* Employment info will be here */}
                employmentType/department/jobTitle/salary/annualSalary/entry
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>Leave request</h2>
              <p>
                {/* Calendars from-to will be here/should be separate component */}
                calendars
              </p>
              <button className="btn btn-outline-secondary" type="button">
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
