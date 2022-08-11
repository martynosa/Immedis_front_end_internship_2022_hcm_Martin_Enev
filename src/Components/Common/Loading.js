import React from 'react';

import Styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={Styles.loading}>
      <div className={`${Styles.spinner} spinner-grow`}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
