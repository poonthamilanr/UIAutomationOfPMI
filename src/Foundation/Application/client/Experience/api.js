import applicationApiService from 'foundation/Application/application-api-service';

export const update = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await applicationApiService.put(request);
  return response.data;
};

export const create = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await applicationApiService.post(request);
  return response.data;
};

export const remove = async params => {
  const request = { url: params.url };
  const response = await applicationApiService.delete(request);
  return response.data;
};

export const fetch = async params => {
  const request = { url: params.url };
  const response = await applicationApiService.get(request);
  return response.data;
};