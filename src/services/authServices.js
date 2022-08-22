import { AUTH_URL } from './constants';

export const login = async (user) => {
  const request = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const result = await request.json();
  if (request.status === 200) {
    localStorage.setItem('user', JSON.stringify(result.data));
    return result.data;
  }
  throw result.message;
};

export const register = async (user) => {
  const request = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const result = await request.json();
  if (request.status === 200) {
    localStorage.setItem('user', JSON.stringify(result.data));
    return result.data;
  }
  throw result.message;
};
