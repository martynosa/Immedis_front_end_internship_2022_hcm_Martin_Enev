import React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { PHOTO_URL } from '../../services/constants';
import { deleteEmployee } from '../../services/employeesServices';
import { slugify } from '../../services/helpers';
import Button from './Button';
import Styles from './PageHeader.module.css';

const PageHeader = ({ user, employee, openNotification }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const fromUpdate = location.pathname.split('/').at(-1) === 'update';

  const backHandler = () => {
    return fromUpdate
      ? navigate(`/employees/${slugify(employee.fullName)}`, {
          state: employee._id,
        })
      : navigate('/employees');
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingBtn(true);
      await deleteEmployee(user.token, employee._id);
      openNotification('success', `${employee.fullName} deleted successfully.`);
      setIsLoadingBtn(false);
      navigate('/employees');
    } catch (error) {
      openNotification('fail', error.message);
      setIsLoadingBtn(false);
    }
  };

  return (
    <header className={`${Styles.header} pb-3 mb-3 border-bottom`}>
      <Button
        color={'warning'}
        text={'Back'}
        type={'button'}
        onClickHandler={backHandler}
      />
      <div className={Styles.fullName}>
        <img
          className={Styles.photo}
          src={`${PHOTO_URL}/${employee.photo}`}
          alt="employee's mugshot"
        ></img>
        <span className="fs-4">{employee.fullName}</span>
      </div>
      <div className={Styles.btnGroup}>
        {!fromUpdate && (
          <Link
            className="btn btn-primary"
            to={`/employees/${slugify(employee.fullName)}/update`}
            state={employee._id}
          >
            Update
          </Link>
        )}

        {user.role === 'hr' && user._id !== employee._id && (
          <Button
            isLoading={isLoadingBtn}
            color={'danger'}
            text={'Delete'}
            type={'button'}
            onClickHandler={deleteHandler}
          />
        )}
      </div>
    </header>
  );
};

export default PageHeader;
