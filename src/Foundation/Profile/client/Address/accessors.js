import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getAddresses = state =>
  state.profile.addresses ? state.profile.addresses.entity : undefined;

export const getAddressStatus = state =>
  state.profile.addresses ? state.profile.addresses.status : ApiStatus.Idle;

export const getTypedProfileAddress = type => state =>
  getAddresses(state) && getAddresses(state).find(address => address.addressTypeEnum === type);
