import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import profileApiService from 'foundation/Profile/profile-api-service';
import mockData from './mock';

export const fetchProfileImageUrl = async () => {
  if (isPageSimulation()) {
    return mockData;
  }

  const request = {
    url: `/api/Profile/my/image-url`,
    customErrorHandling: true,
  };
  const response = await profileApiService.get(request);

  return response.data;
};