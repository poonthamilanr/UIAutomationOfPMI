import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getMcExam } from "foundation/Application/client/Exam/accessors";

const extractReference = (links, name) => links && links[name] && links[name].href;

export const getApplicationRequestIdle = state => state.application.application.status === ApiStatus.Idle;

export const getApplication = state =>
  state.application.application.entity ? state.application.application.entity : undefined;

export const isAuditSubmitted = state =>
  state.application.application.entity ? state.application.application.entity.auditStatusEnum === 'AuditDocumentationReceived' : false;

export const isAdminView = state =>
  state.application.application.entity && state.application.application.entity.IsAdminView !== undefined ? state.application.application.entity.IsAdminView : false;

export const getAuditDocumentInfo = state =>
  getApplication(state) && getApplication(state).auditDocuments;

export const getApplicationStatus = state =>
  state.application.application.entity ? state.application.application.status : ApiStatus.Idle;

export const getApplicationType = state =>
  getApplication(state) && getApplication(state).certificationTypeEnum;

export const getApplicationApi = state =>
  getApplication(state) && extractReference(getApplication(state)._links, 'self');

export const getEmbedded = state =>
  getApplication(state) && getApplication(state)._embedded;

export const getAcademicEducation = state => {
  // API doesn't return null for empty academic education. Have to fix it on UI
  const application = getApplication(state);
  const academicEducation = application && application.academicEducation;

  if (!application) {
    return null;
  }
  if (academicEducation.degreeEnum === 0) {
    return null;
  }
  return {
    ...academicEducation,
    accreditedUniversity: application.accreditedUniversity,
    accreditedUniversityDegree: application.accreditedUniversityDegree,
  };
}

export const getAcademicEducationApi = state =>
  getApplication(state) && extractReference(getApplication(state)._links, 'academicEducation');

export const getProfEducation = state =>
  getEmbedded(state) && getEmbedded(state).education;

export const getProfEducationResources = state =>
  getProfEducation(state) && getProfEducation(state).resources;

export const getProfEducationLinks = state =>
  getProfEducation(state) && getProfEducation(state)._links;

export const getProfEducationApi = state =>
  getProfEducationLinks(state) && extractReference(getProfEducationLinks(state), 'self');

export const getExperience = state =>
  getEmbedded(state) && getEmbedded(state).experience;

export const getExperienceResources = state =>
  getExperience(state) && getExperience(state).resources;

export const getExperienceLinks = state =>
  getExperience(state) && getExperience(state)._links;

export const getExperienceApi = state =>
  getExperienceLinks(state) && extractReference(getExperienceLinks(state), 'self');

export const getExams = state =>
  getEmbedded(state) && getEmbedded(state).exams;

export const getExamsResources = state =>
  getExams(state) && getExams(state).resources;

export const getExamsLinks = state =>
  getExams(state) && getExams(state)._links;

export const getExamsApi = state =>
  getExamsLinks(state) && extractReference(getExamsLinks(state), 'self');

export const getActiveExam = state =>
  getExamsResources(state) ? getExamsResources(state).find(exam => exam.isActive === true) : getMcExam(state);

export const getExamLocationDetailsApi = state =>
  getActiveExam(state) && extractReference(getActiveExam(state)._links, 'exam-location');

export const getExamAccommodationApi = state =>
  getActiveExam(state) && extractReference(getActiveExam(state)._links, 'exam-accommodation');

export const getNameOnIdentification = state =>
  getActiveExam(state) && getActiveExam(state).identification && getActiveExam(state).identification.name;

export const getNameOnIdentificationApi = state =>
  getActiveExam(state) && extractReference(getActiveExam(state)._links, 'identification-name');

export const getNameOnCertificate = state =>
  state.application.application.entity && state.application.application.entity.nameToBeOnApplication;

export const getNameOnCertificateApi = state =>
  state.application.application.entity ? extractReference(state.application.application.entity._links, 'name') : undefined;

export const getExamIdentificationAddress = state => {
  // API doesn't return null for empty address. Have to fix it on UI
  const address = getActiveExam(state) && getActiveExam(state).identification && getActiveExam(state).identification.address;
  if (address && (!address.countryCode || !address.AddressType)) {
    return null;
  }
  return address;
}
export const getExamVendorCountry = state => {
  if (getActiveExam(state)) {
    return getActiveExam(state).examVendorCountry;
  }
  return "";
}

export const getExamIdentificationAddressApi = state =>
  getActiveExam(state) && extractReference(getActiveExam(state)._links, 'identification-address');

export const getExperienceSummaries = state =>
  getEmbedded(state) && getEmbedded(state).experienceSummaries;

export const getExperienceSummariesResources = state =>
  getExperienceSummaries(state) && getExperienceSummaries(state).resources;

export const getExperienceSummariesLinks = state =>
  getExperienceSummaries(state) && getExperienceSummaries(state)._links;

export const getExperienceSummariesApi = state =>
  getExperienceSummariesLinks(state) && extractReference(getExperienceSummariesLinks(state), 'self');

export const getOpenExperienceSummariesApi = state =>
  getExperienceSummariesLinks(state) && extractReference(getExperienceSummariesLinks(state), 'open');

