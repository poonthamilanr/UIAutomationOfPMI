import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import applicationApiService from 'foundation/Application/application-api-service';
import mockData from './mock';

export const fetchAppRequirements = async (appApiUrl) => {
  if (isPageSimulation()) {
    return mockData;
  }

  const request = {
    url: `${appApiUrl}/requirements-status`,
  };
  const response = await applicationApiService.get(request);
  return response.data;
};
