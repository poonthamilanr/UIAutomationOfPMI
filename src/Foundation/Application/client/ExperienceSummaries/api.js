import applicationApiService from 'foundation/Application/application-api-service';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import answersMock from './answersMock';
import questionsMock from './questionsMock';
import openExperienceSummariesMock from './openExperienceSummariesMock';

export const fetchExperienceSummariesQuestions = async url => {
  if (isPageSimulation()) {
    return questionsMock;
  }

  const request = { url };
  const response = await applicationApiService.get(request);
  return response.data;
};

export const fetchExperienceSummariesAnswers = async url => {
  if (isPageSimulation()) {
    return answersMock;
  }

  const request = { url };
  const response = await applicationApiService.get(request);
  return response.data;
};

export const fetchOpenExperienceSummaries = async url => {
  if (isPageSimulation()) {
    return openExperienceSummariesMock;
  }

  const request = { url };
  const response = await applicationApiService.get(request);
  return response.data;
};

export const updateExperienceSummariesAnswer = async params => {
  const request = {
    url: params.url,
    data: params.data,
  };
  const response = await applicationApiService.put(request);
  return response.data;
};

export const submitExperienceSummaries = async url => {
  const request = { url };
  const response = await applicationApiService.post(request);

  return response.data;
};