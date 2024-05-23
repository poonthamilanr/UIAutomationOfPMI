import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getNameOnIdentification = state =>
  state.application.nameOnIdentification.entity ? state.application.nameOnIdentification.entity : undefined;

export const getNameOnIdentificationStatus = state =>
  state.application.nameOnIdentification ? state.application.nameOnIdentification.status : ApiStatus.Idle;
