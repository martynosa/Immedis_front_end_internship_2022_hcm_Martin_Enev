const EMPL_URL = 'http://localhost:5000/employees';

export const getEmployees = async (token) => {
  const request = await fetch(`${EMPL_URL}`, {
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
