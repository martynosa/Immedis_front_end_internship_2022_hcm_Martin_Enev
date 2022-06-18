import React from 'react';

import Styles from './Notification.module.css';

const Notification = ({ status, message, closeHandler }) => {
  let classes = '';

  if (status === 'success') {
    classes = `${Styles.notification} ${Styles.success}`;
  }

  if (status === 'fail') {
    classes = `${Styles.notification} ${Styles.fail}`;
  }

  return (
    <div className={classes}>
      <div>{message}</div>
      <div className={Styles.closeBtn} onClick={closeHandler}>
        &times;
      </div>
    </div>
  );
};

export default Notification;
