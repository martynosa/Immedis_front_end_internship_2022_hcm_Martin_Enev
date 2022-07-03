import React from 'react';
import { useState, useEffect } from 'react';

import { useAuth } from '../AuthContext';
import { getEmployees } from '../services/employeesServices';
import PageTitle from './Common/PageTitle';
import EmployeeCard from './Common/EmployeeCard';

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
      <PageTitle title={'Employees'} />
      <div className="employees-container">
        {employees.map((empl) => (
          <EmployeeCard key={empl._id} empl={empl} />
        ))}
      </div>
    </>
  );
};

export default Employees;
