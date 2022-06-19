import React from 'react';

import Styles from './EmployeesTable.module.css';

const EmployeesTable = ({ employees }) => {
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
            <tr key={empl._id}>
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
