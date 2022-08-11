import React from 'react';

import Styles from './Button.module.css';

export default function Button({
  isLoading,
  color,
  addClass,
  text,
  type,
  onClickHandler,
  isDisabled,
}) {
  if (isLoading === true) text = 'Loading...';

  return (
    <button
      className={`${Styles.btn} btn btn-${color} ${addClass}`}
      type={type}
      onClick={onClickHandler}
      disabled={isLoading || isDisabled}
    >
      {isLoading && <span className="spinner-grow spinner-grow-sm"></span>}
      {text === 'Back' && <ion-icon name="arrow-round-back"></ion-icon>}
      {text}
    </button>
  );
}
