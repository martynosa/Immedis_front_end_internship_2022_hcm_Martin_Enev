import React from 'react';
import { useState } from 'react';

import { createLeaveRequest } from '../../../services/leaveRequestServices';
import { leaveDaysCalc } from '../../../services/helpers';

const LeaveRequestForm = ({
  openNotification,
  user,
  setUser,
  employee,
  setEmployee,
}) => {
  const [daysError, setDaysError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setDaysError(false);
    setMessageError(false);

    const formData = new FormData(e.target);

    const leaveRequest = {
      message: formData.get('message').trim(),
      from: formData.get('from'),
      to: formData.get('to'),
      ownerId: employee._id,
    };

    let errorMessage = [];

    if (leaveRequest.from.length === 0 || leaveRequest.to.length === 0) {
      setDaysError(true);
      errorMessage.push('From and To dates are required');
    }
    if (leaveDaysCalc(leaveRequest.from, leaveRequest.to) < 0) {
      setDaysError(true);
      errorMessage.push('Leave cannot be negative value');
    }

    if (leaveRequest.message.length === 0) {
      setMessageError(true);
      errorMessage.push('Message is required');
    }

    if (errorMessage.length !== 0) {
      openNotification('fail', errorMessage.join(', ') + '!');
      return;
    }

    try {
      const updatedEmployee = await createLeaveRequest(
        user.token,
        leaveRequest,
        employee._id
      );
      setEmployee(updatedEmployee);
      if (user._id === updatedEmployee._id)
        setUser({ ...user, ...updatedEmployee });
      openNotification(
        'success',
        `Leave request for ${updatedEmployee.fullName} submitted successfully.`
      );
    } catch (error) {
      openNotification('fail', error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="from" className="form-label">
            From
          </label>
          <div className="input-group mb-3">
            <input
              type="date"
              className={daysError ? 'error form-control' : 'form-control'}
              id="from"
              name="from"
            />
          </div>
        </div>

        <div className="col-sm-6">
          <label htmlFor="to" className="form-label">
            To
          </label>
          <div className="input-group mb-3">
            <input
              type="date"
              className={daysError ? 'error form-control' : 'form-control'}
              id="to"
              name="to"
            />
          </div>
        </div>

        <div className="col-sm-12">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className={messageError ? 'error form-control' : 'form-control'}
              id="message"
              name="message"
            />
          </div>
        </div>
      </div>

      <button className="btn btn-primary w-100 mt-3" type="submit">
        Submit
      </button>
    </form>
  );
};

export default LeaveRequestForm;
