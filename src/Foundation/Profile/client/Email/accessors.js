import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getEmail = state => state.profile.email.entity;

export const getSpecEmailApi = state =>
  state.profile.email.entity ? state.profile.email.entity._links.self.href : undefined;

export const getEmailStatus = state =>
  state.profile.email ? state.profile.email.status : ApiStatus.Idle;
