import profileApiService from 'foundation/Profile/profile-api-service';

export const fetchProfileAcademicEducation = async params => {
  const request = { url: params.url };
  const response = await profileApiService.get(request);
  return response.data;
};

export const createProfileAcademicEducation = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await profileApiService.post(request);
  return response.data;
};

export const updateProfileAcademicEducation = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await profileApiService.put(request);
  return response.data;
};