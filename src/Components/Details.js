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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const leaveRequest = {
      message: formData.get('message'),
      from: formData.get('from'),
      to: formData.get('to'),
    };
    console.log(leaveRequest);
  };

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
              Birth date: {dateFixer(employee.birthDate)} (
              {`${employee.yearsOld} years old`})
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
              <p>Remaining leave: {employee.remainingLeave} days</p>
            </div>
          </div>

          <div className="col-md-5">
            <div className="h-100 p-5 rounded-3">
              <h2 className="mb-3">Leave request</h2>
              <form onSubmit={onSubmitHandler}>
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="from" className="form-label">
                      From
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="date"
                        className="form-control"
                        id="from"
                        name="from"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="to" className="form-label">
                      To
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="date"
                        className="form-control"
                        id="to"
                        name="to"
                      />
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="message"
                        name="message"
                      />
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary w-100 mt-5" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
