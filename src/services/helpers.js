export const slugify = (emplFullName) => {
  return emplFullName
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const dateFixer = (date) => {
  if (!date) return;
  return date.split('T')[0].split('-').reverse().join('-');
};

export const defaultValueDate = (date) => {
  if (!date) return;
  return date.split('T')[0];
};

export const leaveDaysCalc = (from, to) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return (new Date(to) - new Date(from)) / oneDay + 1;
};

export const extractId = (params) => {
  return params.split('-').at(-1);
};
