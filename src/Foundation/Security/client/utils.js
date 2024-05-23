import config from 'foundation/Config/client';
import Cookies from 'js-cookie';

export const redirectToIDP = () => {
  if (window.location.search.indexOf('auth') < 0) { // avoid redierct loop in case of broken token api
    const { sitecoreInstanceUrl, authReturnRoot } = config;
    const search = window.location.search ? `${window.location.search}&auth` : '?auth';
    const authReturnUrl = encodeURIComponent(`${authReturnRoot}${window.location.pathname}${search}`);
    const url = `${sitecoreInstanceUrl}/cert-app/home/identity-redirect?returnUrl=${authReturnUrl}`;

    document.body.innerHTML += `<form id="idpForm" action="${url}" method="post"></form>`;
    document.getElementById('idpForm').submit();
  }
}

export const isAuthorized = () => {
  return Cookies.get('authToken');
}