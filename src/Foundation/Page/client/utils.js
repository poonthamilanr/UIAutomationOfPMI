export const getUrlParameter = (name) => {
  if (typeof window !== 'undefined') {
    const escapedName = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${escapedName}=([^&#]*)`,`i`);
    const results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  return null;
};

export const getCertTypeFromRoute = () => {
  if (typeof window !== 'undefined') {
    const regex = new RegExp(`/([^/?]*)([^/]*)$`,`i`);
    const results = regex.exec(window.location.pathname);
    return results === null ? '' : decodeURIComponent(results[1]);
  }
  return null;
}