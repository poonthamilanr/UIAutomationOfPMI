import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import applicationApiService from 'foundation/Application/application-api-service';
import mockData from './mock';

export const fetchApplicationPaymentInfo = async (certType) => {
  if (isPageSimulation()) {
    return mockData;
  }

  const request = { url: `/api/Applications/person/my/${certType}/open/paymentInfo` };
  const response = await applicationApiService.get(request);
  return response.data;
};