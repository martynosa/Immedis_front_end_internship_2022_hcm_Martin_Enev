import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { PHOTO_URL } from '../../services/constants';
import { deleteEmployee } from '../../services/employeesServices';
import { slugify } from '../../services/helpers';
import Styles from './PageHeader.module.css';

const PageHeader = ({ user, employee, openNotification }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromUpdate = location.pathname.split('/').at(-1) === 'update';

  const backHandler = () => {
    return fromUpdate
      ? navigate(`/employees/${slugify(employee.fullName)}`, {
          state: employee._id,
        })
      : navigate('/');
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      await deleteEmployee(user.token, employee._id);
      openNotification('success', `${employee.fullName} deleted successfully.`);
      navigate('/employees');
    } catch (error) {
      openNotification('fail', error.message);
    }
  };

  return (
    <header className={`${Styles.header} pb-3 mb-3 border-bottom`}>
      <button
        className={`${Styles.backBtn} btn btn-warning`}
        onClick={backHandler}
      >
        <ion-icon name="arrow-back"></ion-icon>
        back
      </button>
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
          <button
            className="btn btn-danger"
            type="button"
            onClick={deleteHandler}
          >
            Delete
          </button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
