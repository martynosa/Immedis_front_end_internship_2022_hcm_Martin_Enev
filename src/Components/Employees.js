import React from 'react';
import { useState, useEffect } from 'react';

import { useAuth } from '../AuthContext';
import { getEmployees } from '../services/employeesServices';
import PageTitle from './Common/PageTitle';
import EmployeesTable from './Common/EmployeesTable';

const Employees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEmployees(user.token).then((empls) => {
      setEmployees(empls);
      setIsLoading(false);
    });
  }, [user.token]);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <PageTitle title={'Employees'} />
        <EmployeesTable employees={employees} />
      </div>
    </>
  );
};

export default Employees;
