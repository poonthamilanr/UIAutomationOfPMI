import axios from 'axios';
import { getUrlParameter } from "foundation/Page/client/utils";
import { getCertType, getWorkflowType } from "foundation/Application/client/certtype-storage";

/**
 * Implements a data fetcher using Axios - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpJsonFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 */
export function dataFetcher(url, data) {
  const certType = getUrlParameter('certtype') || getCertType();
  const errorCode = getUrlParameter('errorcode');
  const isChVendor = getUrlParameter('isChVendor');
  const workflowType = getWorkflowType();
  const certUrl = `${url}${url.split('?')[1] ? '&':'?sc_site=cert-app&'}certType=${certType}&workflowType=${workflowType}${errorCode ? `&errorCode=${errorCode}` : ""}${isChVendor ? `&isChVendor=${isChVendor}` : ""}`;
  return axios({
    url: certUrl,
    method: data ? 'POST' : 'GET',
    data,
    // note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
    // which is necessary for analytics and such
    withCredentials: true,
  });
}
