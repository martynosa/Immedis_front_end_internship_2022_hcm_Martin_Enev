const AUTH_URL = 'http://localhost:5000/auth';

export const login = async (user) => {
  const request = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const result = await request.json();
  if (request.status === 500) throw result.message;
  localStorage.setItem('user', JSON.stringify(result.data));
  return result.data;
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
  if (request.status === 500) throw result.message;
  localStorage.setItem('user', JSON.stringify(result.data));
  return result.data;
};
