import { LR_URL } from './constants';

export const createLeaveRequest = async (token, formData) => {
  const request = await fetch(`${LR_URL}/`, {
    method: 'POST',
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

export const patchLeaveRequest = async (token, lr) => {
  const request = await fetch(`${LR_URL}/${lr._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(lr),
  });
  const result = await request.json();
  if (request.status === 500) throw result;
  return result.data;
};
