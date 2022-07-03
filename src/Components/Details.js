import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../AuthContext';
import PageHeader from './Common/PageHeader';
import { getEmployee } from '../services/employeesServices';
import { capitalizeFirstLetter, dateFixer } from '../services/helpers';
import Loading from './Common/Loading';

const Details = ({ openNotification }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === '/profile') location.state = user._id;

  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEmployee(user.token, location.state).then((empl) => {
      setEmployee(empl);
      setIsLoading(false);
    });
  }, [user.token, location.state]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="details-container py-4 mt-3">
        <PageHeader
          user={user}
          employee={employee}
          openNotification={openNotification}
        />
        <div className="rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold mb-3">General</h1>
            <p className="col-md-8 fs-4">
              Gender: {capitalizeFirstLetter(employee.gender)}
            </p>
            <p className="col-md-8 fs-4">
              Birth date: {dateFixer(employee.birthDate)}
            </p>
            <p className="col-md-8 fs-4">Phone number: {employee.phone}</p>
            <p className="col-md-8 fs-4">Address: {employee.address}</p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-7">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2 className="mb-3">Employment</h2>
              <p>Hired on: {dateFixer(employee.entryDate)}</p>
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
