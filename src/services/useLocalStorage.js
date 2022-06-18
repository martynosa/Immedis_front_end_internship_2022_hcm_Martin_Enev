import { useState } from 'react';

export const useLocalStorage = (initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem('user');
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  const setItem = (value) => {
    localStorage.setItem('user', JSON.stringify(value));
    setState(value);
  };

  return [state, setItem];
};
