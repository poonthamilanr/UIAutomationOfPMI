import axios from 'axios';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import { redirectToIDP } from "foundation/Security/client/utils";
import { trackException } from 'foundation/Analytics/client/AdobeAnalytics/accessors'
import { logException } from 'foundation/Log/client/Exception';
import Cookies from 'js-cookie';

class ApiService {
  // private errorNotificationOptions: NotificationOptions | undefined;

  constructor(baseURL, withCredentials, ignoreToken) {
    this.ignoreToken = ignoreToken;
    this.client = axios.create({ withCredentials: !!withCredentials });
    this.client.defaults.baseURL = baseURL;

    // // Add a request interceptor
    // this.client.interceptors.request.use(
    //   config => {
    //     // store.dispatch(statusActions.hideLoadingStatus());
    //     return config;
    //   },
    //   error => {
    //     // store.dispatch(statusActions.hideLoadingStatus());
    //     return Promise.reject(error);
    //   }
    // );

    // Add a response interceptor
    this.client.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const { appRedirects } = getSitecoreContext();
        const redirectUrls = appRedirects.redirectLinks;
        if (!error.response) {
          if (document.referrer.indexOf(redirectUrls.Sorry) === -1) {
            if(error.request !== null && error.request.responseURL !== null && error.request.responseURL.indexOf('/Logging/log') === -1)
            {
              await logException({
                logMessage: 'api call failure without response',
                source: error,
              });
            }
            window.location.href = redirectUrls.Sorry;
          }

          return Promise.reject(error);
        }

        const { response: { data, status, config: { customErrorHandling, customerErrorEvent } } } = error;

        if (status === 400 || status === 422  || status === 500 || status === 502 || status === 503) {
          let errorMessage = '';
          if (data && data.detail && data.detail.match(/code:.*\|reason:(.*)/)) {
            errorMessage = data.detail.match(/code:.*\|reason:(.*)/)[1];
          }
          else if(data && data.error && data.error.Message)
          {
            errorMessage = data.error.Message;
          }
          else if(data)
          {
            errorMessage = data.title;
          }
          trackException(errorMessage);
        }

        if (status === 400 || status === 422 && !customErrorHandling || status === 500 || status === 502 || status === 503) {
          let errorCode = '';
          if (data && data.detail && data.detail.match(/code:(.*?)\|reason:/)) {
            errorCode = data.detail.match(/code:(.*?)\|reason:/)[1];
          }
          if(error.request !== null && error.request.responseURL !== null && error.request.responseURL.indexOf('/Logging/log') === -1)
          {
            await logException({
              logMessage: errorCode,
              source: error.response,
            });
          }
          window.location.href = `${redirectUrls.Sorry}?errorcode=${errorCode}`;
        }
        if (error.response.status === 401) {
          Cookies.remove('authToken');
          redirectToIDP()
        }
        if(status === 422 && customErrorHandling && customerErrorEvent !== undefined)
        {
          customerErrorEvent();
        }

        // errorNotification(message, undefined, this.errorNotificationOptions);
        return Promise.reject(error);
      },
    );
  }

  post (request) {
    const requestConfig = this.buildRequestConfig(request);
    // this.errorNotificationOptions = request.errorNotificationOptions;
    return this.client.post(request.url, request.data, requestConfig);
  }

  put (request) {
    const requestConfig = this.buildRequestConfig(request);
    // this.errorNotificationOptions = request.errorNotificationOptions;
    return this.client.put(request.url, request.data, requestConfig);
  }

  get (request) {
    const requestConfig = this.buildRequestConfig(request);
    // this.errorNotificationOptions = request.errorNotificationOptions;
    if (isPageSimulation()) {
      console.log(`API call to ${request.url} is cancelled. No API calls allowed in Expereince Editor`);
      return {};
    }
    return this.client.get(request.url, requestConfig);
  }

  delete (request) {
    const requestConfig = this.buildRequestConfig(request);
    // this.errorNotificationOptions = request.errorNotificationOptions;
    return this.client.delete(request.url, { ...requestConfig, data: request.data });
  }

  buildRequestConfig (request) {
    const requestConfig = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        ...request.headers,
      },
      customErrorHandling: request.customErrorHandling,
      customerErrorEvent: request.customerErrorEvent,
    };

    if (request.responseType) {
      requestConfig.responseType = request.responseType;
    }

    requestConfig.baseURL = request.baseUrl ? request.baseUrl : this.client.defaults.baseURL;
    // Add authorization header
    if (!this.ignoreToken) {
      const authToken = Cookies.get('authToken');
      if (authToken && authToken !== 'null') {
        requestConfig.headers[`Authorization`] = `Bearer ${authToken}`;
      }
    }
    return requestConfig;
  };
}

export default ApiService;
