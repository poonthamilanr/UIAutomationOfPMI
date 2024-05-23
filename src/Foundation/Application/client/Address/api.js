import applicationApiService from 'foundation/Application/application-api-service';
import certificationApiService from 'foundation/Application/certification-api-service';

export const fetchAddress = async url => {
  const request = { url };
  const response = await applicationApiService.get(request);
  return response.data;
};

export const updateAddress = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const data =  await applicationApiService
    .put(request)
    .then(response => response.data.identification.address)

  return data;
};

export const updateMcExamAddress = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const data =  await certificationApiService
    .put(request)
    .then(response => response.data.identification.address)

  return data;
};
