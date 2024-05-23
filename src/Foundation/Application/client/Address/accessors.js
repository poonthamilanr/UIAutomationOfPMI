import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getIdentificationAddress = state =>
  state.application.address.entity ? state.application.address.entity : undefined;

export const getIdentificationAddressStatus = state =>
  state.application.address.entity ? state.application.address.status : ApiStatus.Idle;
