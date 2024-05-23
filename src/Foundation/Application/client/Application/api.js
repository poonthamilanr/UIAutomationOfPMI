import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import applicationApiService from 'foundation/Application/application-api-service';
import mockData from './mock';

// eslint-disable-next-line import/prefer-default-export
export const fetchApplications = async () => {
  const request = { url: `/api/Applications/person/my` };
  const response = await applicationApiService.get(request);

  return response.data;
};

export const fetchActiveApplication = async (certType) => {
  if (isPageSimulation()) {
    return mockData;
  }

  const request = { url: `/api/Applications/person/my/${certType}/active` };
  const response = await applicationApiService.get(request);

  return response.data;
};

export const fetchActiveWithCreate = async (certType, studentBundle) => {
  const baseUrl = `/api/Applications/person/my/${certType}/activeWithCreate`
  const request = { url: studentBundle ? `${baseUrl}?studentBundle=true` : baseUrl };
  const response = await applicationApiService.get(request);

  return response.data;
};

export const fetchOpenApplication = async (certType) => {
  if (isPageSimulation()) {
    return mockData;
  }
  const request = { url: `/api/Applications/person/my/${certType}/open` };
  const response = await applicationApiService.get(request);
  return response.data;
};

export const fetchAuditApplication = async (certType) => {
  if (isPageSimulation()) {
    return mockData;
  }
  const request = { url: `/api/Audit/certification/${certType}` };
  const response = await applicationApiService.get(request);
  return response.data;
};

export const fetchAuditApplicationById = async (applicationId) => {
  if (isPageSimulation()) {
    return mockData;
  }
  const request = { url: `/api/Audit/auditapplication/${applicationId}` };
  const response = await applicationApiService.get(request);
  return response.data;
};

export const fetchApplicationById = async (id) => {
  const request = { url: `api/Applications/${id}` };
  const response = await applicationApiService.get(request);

  return response.data;
};

export const submitApplication = async (appUrl) => {
  const request = { url: `${appUrl}/submit` };
  const response = await applicationApiService.post(request);
  return response.data;
};

export const submitAuditApplication = async (appUrl) => {
  const request = { url: `${appUrl}/audit-documentation-received` };
  const response = await applicationApiService.post(request);
  return response.data;
};

export const closeApplication = async (appUrl) => {
  const request = { url: `${appUrl}/candidate-close` };
  const response = await applicationApiService.post(request);
  return response.data;
};