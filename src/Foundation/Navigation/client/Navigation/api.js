import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import navigationApiService from 'foundation/Navigation/navigation-api-service';
import config from 'foundation/Config/client';
import mockData from './mock';

export const fetchNavigation = async () => {
  if (isPageSimulation()) {
    return mockData;
  }

  const request = { url: `/api/cert-navigation/account-menu-items?returnUrl=${config.sitecoreInstanceUrl}` };
  const response = await navigationApiService.get(request);

  return response.data;
};