import React from 'react';
import { dateFixer } from '../../../services/helpers';

const LeaveRequestCell = ({ lr, approveHandler, rejectHandler }) => {
  return (
    <tr>
      <th scope="row">{lr.message}</th>
      <td>{dateFixer(lr.from)}</td>
      <td>{dateFixer(lr.to)}</td>
      <td>{lr.days}</td>
      {lr.status === 'pending' && <td className="text-warning">{lr.status}</td>}
      {lr.status === 'approved' && (
        <td className="text-success">{lr.status}</td>
      )}
      {lr.status === 'rejected' && <td className="text-danger">{lr.status}</td>}
      <td>
        <div className="btnGroup">
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={approveHandler}
          >
            Approve
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={rejectHandler}
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LeaveRequestCell;
