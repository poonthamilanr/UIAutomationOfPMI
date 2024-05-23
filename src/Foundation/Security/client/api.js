import authApiService from './auth-api-service';
import { redirectToIDP } from './utils';

export const fetchAuthToken = async () => {
  const request = {
    url: `/api/cert-app-auth-token`,
  };
  const response = await authApiService.get(request);
  if (!response.data || response.data === 'null') {
    redirectToIDP();
  }

  return response.data;
};
