import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import applicationApiService from 'foundation/Application/application-api-service';
import mockData from './mock';

export const fetchGeneralSettings = async () => {
  if (isPageSimulation()) {
    return mockData;
  }

  const request = { url: `/api/applications/Configurations/cert/general` };
  const response = await applicationApiService.get(request);
  return response.data;
};