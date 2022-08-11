import React from 'react';
import { useState } from 'react';

import { patchLeaveRequest } from '../../../services/leaveRequestServices';
import { dateFixer } from '../../../services/helpers';
import Button from '../../Common/Button';

const LeaveRequestCell = ({
  lr,
  user,
  setUser,
  setEmployee,
  openNotification,
}) => {
  const [isLoadingApproveBtn, setIsLoadingApproveBtn] = useState(false);
  const [isLoadingRejectBtn, setIsLoadingRejectBtn] = useState(false);

  const approveHandler = async () => {
    try {
      setIsLoadingApproveBtn(true);
      const updatedEmployee = await patchLeaveRequest(user.token, {
        _id: lr._id,
        status: 'approved',
      });
      setEmployee(updatedEmployee);
      if (user._id === updatedEmployee._id)
        setUser({ ...user, ...updatedEmployee });
      openNotification('success', `${lr.message} has been approved!`);
      setIsLoadingApproveBtn(false);
    } catch (error) {
      openNotification('fail', error.message);
      setIsLoadingApproveBtn(false);
    }
  };

  const rejectHandler = async () => {
    try {
      setIsLoadingRejectBtn(true);
      const updatedEmployee = await patchLeaveRequest(user.token, {
        _id: lr._id,
        status: 'rejected',
      });
      setEmployee(updatedEmployee);
      if (user._id === updatedEmployee._id)
        setUser({ ...user, ...updatedEmployee });
      openNotification('fail', `${lr.message} has been rejected!`);
      setIsLoadingRejectBtn(false);
    } catch (error) {
      openNotification('fail', error.message);
      setIsLoadingRejectBtn(false);
    }
  };

  return (
    <tr>
      <th className="message-th">{lr.message}</th>
      <td>{dateFixer(lr.from)}</td>
      <td>{dateFixer(lr.to)}</td>
      <td>{lr.days}</td>
      {lr.status === 'pending' && <td className="text-warning">{lr.status}</td>}
      {lr.status === 'approved' && (
        <td className="text-success">{lr.status}</td>
      )}
      {lr.status === 'rejected' && <td className="text-danger">{lr.status}</td>}
      <td className="actions-td">
        <div className="actions-button-group">
          <Button
            type={'button'}
            color={'success'}
            text={'Approve'}
            addClass={'btn-sm w-100'}
            onClickHandler={approveHandler}
            isLoading={isLoadingApproveBtn}
            isDisabled={lr.status !== 'pending' || user.role === 'employee'}
          />

          <Button
            type={'button'}
            color={'danger'}
            text={'Reject'}
            addClass={'btn-sm w-100'}
            onClickHandler={rejectHandler}
            isLoading={isLoadingRejectBtn}
            isDisabled={lr.status !== 'pending' || user.role === 'employee'}
          />
        </div>
      </td>
    </tr>
  );
};

export default LeaveRequestCell;
