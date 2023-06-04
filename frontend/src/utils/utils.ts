export const formatDate = (value: string) => {
  const date = new Date(value);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

export const getTime = () => {
  const now = new Date();
  return now.toISOString();
};
