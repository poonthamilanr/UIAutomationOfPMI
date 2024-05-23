import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getAcademicEducation = state => state.application.academicEducation.entity;

export const getAcademicEducationStatus = state =>
  state.application.academicEducation.entity ? state.application.academicEducation.status : ApiStatus.Idle;

export const getIsSavingStatus = state => getAcademicEducationStatus(state) === ApiStatus.Submitting;