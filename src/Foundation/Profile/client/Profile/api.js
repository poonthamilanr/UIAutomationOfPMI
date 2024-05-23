import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import profileApiService from 'foundation/Profile/profile-api-service';
import mockData from './mock';

// eslint-disable-next-line import/prefer-default-export
export const fetchProfile = async () => {
  if (isPageSimulation()) {
    return mockData;
  }

  const request = {
    url: `/api/Profile/my`,
  };
  const response = await profileApiService.get(request);

  return response.data;
};

export const isAdminProfile = async (data) => {
  if (isPageSimulation()) {
    return false;
  }

  const request = {
    url: `/api/Profile/${data.adminPersonId}/isAdmin?encryptedText=${data.ecryptedText}`,
  };
  const response = await profileApiService.get(request);

  return response.data;
};