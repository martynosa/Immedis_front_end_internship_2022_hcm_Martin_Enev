import React from 'react';
import { useState } from 'react';

import { updateProfilePhoto } from '../../services/employeesServices';
import Button from '../Common/Button';

const UpdateProfilePhotoForm = ({
  user,
  setUser,
  employee,
  setEmployee,
  openNotification,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProfilePhotoHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      setIsLoading(true);
      const updatedEmployee = await updateProfilePhoto(
        user.token,
        formData,
        employee._id
      );
      setEmployee(updatedEmployee);
      if (user._id === updatedEmployee._id)
        setUser({ ...user, ...updatedEmployee });
      openNotification(
        'success',
        `${updatedEmployee.fullName} updated successfully.`
      );
      setIsLoading(false);
    } catch (error) {
      openNotification('fail', error.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={updateProfilePhotoHandler} className="mb-5">
      <div className="row g-3">
        <div className="col-md-12">
          <label htmlFor="uploadPhoto" className="form-label">
            Profile photo
          </label>
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              id="uploadPhoto"
              name="photo"
            />

            <Button
              isLoading={isLoading}
              color={'primary'}
              text={'Upload'}
              type={'submit'}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateProfilePhotoForm;
