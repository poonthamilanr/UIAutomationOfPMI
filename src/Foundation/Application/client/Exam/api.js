import profileApiService from 'foundation/Profile/profile-api-service';
import certificationApiService from 'foundation/Application/certification-api-service';

export const fetchExams = async url => {
  const request = { url };
  const response = await profileApiService.get(request);
  return response.data;
};

export const fetchActiveExam = async (certType) => {
  const request = { url: `/api/Exams/person/my/${certType}/active` };
  const response = await certificationApiService.get(request);
  return response.data;
};

export const submitExamDetail = async (examUrl) => {
  const request = { url: `${examUrl}/exam-detail-complete` };
  const response = await certificationApiService.post(request);
  return response.data;
};

