import profileApiService from 'foundation/Profile/profile-api-service';

// eslint-disable-next-line import/prefer-default-export
export const fetchAccreditedUniversities = async () => {
  const request = {
    url: '/api/profile/Metadata/accreditedUniversities',
  };
  const response = await profileApiService.get(request);
  return response.data;
};

// eslint-disable-next-line import/prefer-default-export
export const fetchAccreditedUniversity = async (id) => {
  const request = {
    url: `/api/profile/Metadata/accreditedUniversities/${id}`,
  };
  const response = await profileApiService.get(request);
  return response.data;
};