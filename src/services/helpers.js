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
