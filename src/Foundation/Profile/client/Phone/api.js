import profileApiService from 'foundation/Profile/profile-api-service';

export const fetchPhones = async url => {
  const request = { url };
  const response = await profileApiService.get(request);
  return response.data;
};

export const createPhone = async params => {
  const request = {
    url: params.url,
    data: params.data,
    customErrorHandling: true,
  };
  const response = await profileApiService.post(request);
  return response.data;
};

export const updatePhone = async params => {
  const request = {
    url: params.url,
    data: params.data,
    customErrorHandling: true,
  };
  const response = await profileApiService.put(request);
  return response.data;
};

export const setPrimayPhone = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await profileApiService.post(request);
  return response.data;
};

