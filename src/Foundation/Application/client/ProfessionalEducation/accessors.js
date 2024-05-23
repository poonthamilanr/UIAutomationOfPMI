import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getProfessionalEducation = state => state.application.professionalEducation.entity;

export const getProfessionalEducationStatus = state =>
  state.application.professionalEducation.entity ? state.application.professionalEducation.status : ApiStatus.Idle;

export const getIsSavingStatus = state => getProfessionalEducationStatus(state) === ApiStatus.Submitting;

export const getEducationRequirements = state => state.appRequirements.entity ? state.appRequirements.entity.educationRequirements : {};

export const getEducationRequirementsMet = state => getEducationRequirements(state).requirementMet;
