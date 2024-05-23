import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import applicationApiService from 'foundation/Application/application-api-service';

export const fetchApplicationFlow = async (certType) => {
  if (isPageSimulation()) {
    return "Initial";
  }
  const request = { url: `/api/Applications/person/my/${certType}/app-flow` };
  const response = await applicationApiService.get(request);
  return response.data;
};