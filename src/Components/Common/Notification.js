import React from 'react';

import Styles from './Notification.module.css';

const Notification = ({ status, message }) => {
  let classes = '';
  let icon = null;

  if (status === 'success') {
    classes = `${Styles.notification} ${Styles.success}`;
    icon = <ion-icon name="checkmark"></ion-icon>;
  }

  if (status === 'fail') {
    classes = `${Styles.notification} ${Styles.fail}`;
    icon = <ion-icon name="close"></ion-icon>;
  }

  return (
    <div className={classes}>
      <div>{icon}</div>
      <div>{message}</div>
    </div>
  );
};

export default Notification;
