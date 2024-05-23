import profileApiService from 'foundation/Profile/profile-api-service';

// eslint-disable-next-line import/prefer-default-export
export const fetchEmail = async url => {
  const request = { url };
  const response = await profileApiService.get(request);
  return response.data;
};

export const updateEmail = async params => {
  const request = {
    url: params.url,
    data: params.data,
    customErrorHandling: true,
  };
  const response = await profileApiService.put(request);
  return response.data;
};

export const createEmail = async params => {
  const request = {
    url: params.url,
    data: params.data,
    customErrorHandling: true,
  };
  const response = await profileApiService.post(request);
  return response.data;
};