import applicationApiService from 'foundation/Application/application-api-service';
import certificationApiService from 'foundation/Application/certification-api-service';

export const updateExamLocation = async params => {
  const request = {
    url:  `${params.url}?countryCode=${params.data.countryCode}`,
    customErrorHandling: true,
  };
  const response = await applicationApiService.put(request);
  return response.data;
};

export const updateExamAccommodation = async params => {
  const request = {
    url: `${params.url}?isAccommodationsRequired=${params.data.accommodationRequested}`,
    customErrorHandling: true,
  };
  const response = await applicationApiService.put(request);
  return response.data;
};

export const updateMcExamLocation = async params => {
  const request = {
    url:  `${params.url}?countryCode=${params.data.countryCode}`,
    customErrorHandling: true,
  };
  const response = await certificationApiService.put(request);
  return response.data;
};

export const updateMcExamAccommodation = async params => {
  const request = {
    url: `${params.url}?isAccommodationsRequested=${params.data.accommodationRequested}`,
    customErrorHandling: true,
  };
  const response = await certificationApiService.put(request);
  return response.data;
};