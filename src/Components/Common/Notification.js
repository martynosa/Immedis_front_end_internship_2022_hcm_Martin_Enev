import React from 'react';
import { useState } from 'react';

import Styles from './Notification.module.css';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);

    setTimeout(() => setIsOpen(false), 1000);
  };

  const closeBtn = () => {
    setIsOpen(false);
  };

  const notify = (
    <div className={Styles.notification}>
      <div>Invalid email or password</div>
      <div className={Styles.closeBtn} onClick={closeBtn}>
        &times;
      </div>
    </div>
  );

  return (
    <>
      <button onClick={open}>error</button>
      {isOpen && notify}
    </>
  );
};

export default Notification;
