import applicationApiService from 'foundation/Application/application-api-service';

export const updateProfessionalEducation = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await applicationApiService.put(request);
  return response.data;
};

export const createProfessionalEducation = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await applicationApiService.post(request);
  return response.data;
};

export const deleteProfessionalEducation = async params => {
  const request = {
    url: params.url,
  };
  const response = await applicationApiService.delete(request);
  return response.data;
};