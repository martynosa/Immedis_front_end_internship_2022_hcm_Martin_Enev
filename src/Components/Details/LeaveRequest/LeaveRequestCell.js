import React from 'react';
import { dateFixer, leaveDaysCalc } from '../../../services/helpers';

const LeaveRequestCell = ({ lr }) => {
  return (
    <tr>
      <th scope="row">{lr.message}</th>
      <td>{dateFixer(lr.from)}</td>
      <td>{dateFixer(lr.to)}</td>
      <td>{leaveDaysCalc(lr.from, lr.to)}</td>
      {lr.status === 'pending' && <td className="text-warning">{lr.status}</td>}
      {lr.status === 'approved' && (
        <td className="text-success">{lr.status}</td>
      )}
      {lr.status === 'rejected' && <td className="text-danger">{lr.status}</td>}
      <td>actions</td>
    </tr>
  );
};

export default LeaveRequestCell;