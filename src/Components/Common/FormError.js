import React from 'react';
import Styles from './FormError.module.css';

const FormError = ({ message }) => {
  return <p className={`${Styles.formError} mt-3`}>&#8212; {message}</p>;
};

export default FormError;
