import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../AuthContext';
import PageHeader from '../Common/PageHeader';
import { getEmployee } from '../../services/employeesServices';
import { capitalizeFirstLetter, dateFixer } from '../../services/helpers';
import Loading from '../Common/Loading';
import LeaveRequestForm from './LeaveRequest/LeaveRequestForm';
import LeaveTable from './LeaveRequest/LeaveTable';

const Details = ({ openNotification }) => {
  const { user, setUser } = useAuth();
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
          openNotification={openNotification}
          user={user}
          employee={employee}
        />
        <div className="rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold mb-3">General</h1>
            <p className="col-md-8 fs-5">
              Gender: {capitalizeFirstLetter(employee.gender)}
            </p>
            <p className="col-md-8 fs-5">
              Birth date: {dateFixer(employee.birthDate)}&nbsp;
              {employee.yearsOld && `(${employee.yearsOld} years old)`}
            </p>
            <p className="col-md-8 fs-5">Phone number: {employee.phone}</p>
            <p className="col-md-8 fs-5">Email: {employee.email}</p>
            <p className="col-md-8 fs-5">Address: {employee.address}</p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-7">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2 className="mb-5">Employment</h2>
              <p className="fs-5 mb-3">
                Hired on: {dateFixer(employee.entryDate)}
              </p>
              <p className="fs-5 mb-3">
                Employment Type: {employee.employmentType}
              </p>
              <p className="fs-5 mb-3">Job title: {employee.jobTitle}</p>
              <p className="fs-5 mb-3">Salary: {employee.salary} BGN</p>
              <p className="fs-5 mb-3">
                Remaining leave: {employee.remainingLeave} days
              </p>
            </div>
          </div>

          <div className="col-md-5">
            <div className="h-100 p-5 rounded-3">
              <h2 className="mb-3">Leave request</h2>
              <LeaveRequestForm
                openNotification={openNotification}
                user={user}
                setUser={setUser}
                employee={employee}
                setEmployee={setEmployee}
              />
            </div>
          </div>
        </div>
        <LeaveTable
          openNotification={openNotification}
          user={user}
          setUser={setUser}
          employee={employee}
          setEmployee={setEmployee}
        />
      </div>
    </>
  );
};

export default Details;
