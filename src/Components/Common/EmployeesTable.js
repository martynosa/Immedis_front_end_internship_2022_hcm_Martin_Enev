import React from 'react';
import { useNavigate } from 'react-router-dom';

import Styles from './EmployeesTable.module.css';
import { useAuth } from '../../AuthContext';
import { slugify } from '../../services/helpers';

const EmployeesTable = ({ employees }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigateHandler = (emplFullName, employeeId) => {
    if (user._id !== employeeId) return;

    return navigate(`/employees/${slugify(emplFullName)}`, {
      state: employeeId,
    });
  };

  return (
    <table className={`${Styles.table} table table-hover`}>
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
            <tr
              key={empl._id}
              onClick={() => navigateHandler(empl.fullName, empl._id)}
              className={user._id === empl._id && Styles.me}
            >
              <th scope="row">
                <img
                  className={Styles.photo}
                  src={`http://localhost:5000/users/${empl.photo}`}
                  alt="employee's mugshot"
                />
              </th>
              <td>{empl.fullName}</td>
              <td>{empl.department}</td>
              <td>{empl.jobTitle}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
