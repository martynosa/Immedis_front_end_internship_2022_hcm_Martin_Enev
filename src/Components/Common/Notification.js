import React from 'react';

import Styles from './Notification.module.css';
import { useNotification } from '../../NotificationContext';

const Notification = () => {
  const { notificationSettings } = useNotification();

  const { state, status, message } = notificationSettings;

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

  if (state) {
    return (
      <div className={classes}>
        <div>{icon}</div>
        <div>{message}</div>
      </div>
    );
  }

  return;
};

export default Notification;
