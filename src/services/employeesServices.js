import { EMPLS_URL } from './constants';

export const getEmployees = async (token) => {
  const request = await fetch(`${EMPLS_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  });
  const result = await request.json();
  if (request.status === 500) throw result;
  return result.data;
};
