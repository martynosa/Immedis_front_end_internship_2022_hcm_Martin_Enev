import React from 'react';
import { useState, useEffect } from 'react';

import { useAuth } from '../AuthContext';
import { getEmployees } from '../services/employeesServices';

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
      <h1 className="display-1 text-center">Employees</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Photo</th>
            <th scope="col">Full name</th>
            <th scope="col">Department</th>
            <th scope="col">Job Title</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((empl) => {
            return (
              <tr key={empl._id}>
                <th scope="row">{empl.photo}</th>
                <td>{empl.fullName}</td>
                <td>{empl.department}</td>
                <td>{empl.jobTitle}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Employees;
