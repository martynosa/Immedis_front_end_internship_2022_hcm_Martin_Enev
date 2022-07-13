import React from 'react';

import LeaveRequestCell from './LeaveRequestCell';

const LeaveTable = ({ leaveRequests }) => {
  const table = (
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
  );

  const emptyMessage = (
    <h6 className="h6 text-center text-muted">No requests</h6>
  );

  return (
    <>
      <h2 className="mt-5 mb-3">Leave history</h2>
      {leaveRequests.length > 0 ? table : emptyMessage}
    </>
  );
};

export default LeaveTable;
