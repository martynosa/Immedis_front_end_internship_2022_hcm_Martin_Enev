import React from 'react';

import Styles from './PageTitle.module.css';

const PageTitle = ({ title }) => {
  return (
    <div className={Styles.pageTitle}>
      <h1>{title}</h1>
    </div>
  );
};

export default PageTitle;
