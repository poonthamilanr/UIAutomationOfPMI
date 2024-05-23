import profileApiService from 'foundation/Profile/profile-api-service';

export const fetchAddresses = async url => {
  const request = { url };
  const response = await profileApiService.get(request);
  return response.data;
};

export const updateAddress = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await profileApiService.put(request)
  return response.data;
};

export const createAddress = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await profileApiService.post(request);
  return response.data;
};
