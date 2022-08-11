import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../AuthContext';
import { PHOTO_URL } from '../../services/constants';
import { slugify, dateFixer } from '../../services/helpers';

import Styles from './EmployeeCard.module.css';

const EmployeeCards = ({ empl }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isMe = user._id === empl._id;

  const navigateHandler = () => {
    if (user.role === 'employee') {
      if (!isMe) return;
    }

    return navigate(`/employees/${slugify(empl.fullName)}`, {
      state: empl._id,
    });
  };

  return (
    <div
      className={
        isMe ? `${Styles.hover} ${Styles.me} card` : `${Styles.hover} card`
      }
      key={empl._id}
      onClick={navigateHandler}
    >
      <img
        className="card-img-top"
        src={`${PHOTO_URL}/${empl.photo}`}
        alt="employee's mugshot"
      />
      <div className="card-body">
        <h5 className="card-title">{empl.fullName}</h5>
        {empl.jobTitle && (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{empl.employmentType}</li>
            <li className="list-group-item">{empl.jobTitle}</li>
          </ul>
        )}
      </div>
      <div className="card-footer">
        <small className="text-muted">
          Updated at: {dateFixer(empl.updatedAt)}
        </small>
      </div>
    </div>
  );
};

export default EmployeeCards;
