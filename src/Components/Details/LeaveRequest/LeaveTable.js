import React from 'react';

import LeaveRequestCell from './LeaveRequestCell';

const LeaveTable = ({ leaveRequests }) => {
  return (
    <>
      <h2 className="mt-5 mb-3">Leave history</h2>
      <table className="table table-hover mb-5">
        <thead>
          <tr>
            <th scope="col">Message</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Days</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((lr) => (
            <LeaveRequestCell key={lr._id} lr={lr} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LeaveTable;
