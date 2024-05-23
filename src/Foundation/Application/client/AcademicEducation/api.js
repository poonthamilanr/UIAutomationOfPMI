import applicationApiService from 'foundation/Application/application-api-service';

export const saveAcademicEducation = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await applicationApiService.put(request);
  return response.data;
};