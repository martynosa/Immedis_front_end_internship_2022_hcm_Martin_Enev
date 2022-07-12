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

export const getEmployee = async (token, id) => {
  const request = await fetch(`${EMPLS_URL}/${id}`, {
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

export const updateEmployee = async (token, id, newData) => {
  const request = await fetch(`${EMPLS_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(newData),
  });
  const result = await request.json();
  if (request.status === 500) throw result;
  return result.data;
};

export const deleteEmployee = async (token, id) => {
  const request = await fetch(`${EMPLS_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  });
  const result = await request.json();
  if (request.status === 500) throw result;
  return result.data;
};

export const updateProfilePhoto = async (token, formData, id) => {
  const request = await fetch(`${EMPLS_URL}/${id}/upp`, {
    method: 'PUT',
    headers: {
      token: token,
    },
    body: formData,
  });
  const result = await request.json();
  if (request.status === 500) throw result;
  return result.data;
};

export const updateLeaveRequest = async (token, formData, id) => {
  const request = await fetch(`${EMPLS_URL}/${id}/lr`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(formData),
  });
  const result = await request.json();
  if (request.status === 500) throw result;
  return result.data;
};
