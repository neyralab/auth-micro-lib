export const getMainDomain = () => {
  const parts = window.location.host.split('.');
  return parts[parts.length - 2] + '.' + parts[parts.length - 1];
};
