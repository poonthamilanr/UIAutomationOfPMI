import applicationApiService from 'foundation/Application/application-api-service';

export const fetchNameOnIdentification = async url => {
  const request = { url };
  const response = await applicationApiService.get(request);
  return response.data;
};

export const saveNameOnIdentification = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await applicationApiService.put(request);
  return response.data;
};
