import profileApiService from 'foundation/Profile/profile-api-service';

// eslint-disable-next-line import/prefer-default-export
export const fetchCountries = async excludeEmbargoed => {
  const request = {
    url: excludeEmbargoed
      ? '/api/profile/Metadata/countries'
      : '/api/profile/Metadata/allcountries',
  };
  const response = await profileApiService.get(request);
  return response.data;
};

// eslint-disable-next-line import/prefer-default-export
export const fetchCountryByCode = async (code) => {
  const request = {
    url: `/api/profile/Metadata/countries/code/${code}`,
  };
  const response = await profileApiService.get(request);
  return response.data;
};

export const fetchStateByCode = async (code) => {
  const request = {
    url: `/api/profile/Metadata/countriesstates/code/${code}`,
  };
  const response = await profileApiService.get(request);
  return response.data;
};

// eslint-disable-next-line import/prefer-default-export
export const fetchEmbargoedCountries = async () => {
  const request = {
    url: `/api/profile/Configurations/embargoedcountry`,
  };
  const response = await profileApiService.get(request);
  return response.data;
};