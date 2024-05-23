import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getExamLocation = state => state.application.examLocation.entity;

export const getExamLocationStatus = state =>
  state.application.examLocation ? state.application.examLocation.status : ApiStatus.Idle;

export const getExamLocationError = state => state.application.examLocation.error;

export const getExamAccommodationStatus = state =>
  state.application.examLocation ? state.application.examLocation.accommodationStatus : ApiStatus.Idle;