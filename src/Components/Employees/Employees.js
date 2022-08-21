import React from 'react';
import { useState, useEffect } from 'react';

import { useAuth } from '../../AuthContext';
import { getEmployees } from '../../services/employeesServices';
import EmployeeCard from './EmployeeCard';
import Loading from '../Common/Loading';

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
    return <Loading />;
  }

  return (
    <>
      <h1 className="display-1 text-center mt-5">Employees</h1>
      <div className="employees-container">
        {employees.map((empl) => (
          <EmployeeCard key={empl._id} empl={empl} user={user} />
        ))}
      </div>
    </>
  );
};

export default Employees;
