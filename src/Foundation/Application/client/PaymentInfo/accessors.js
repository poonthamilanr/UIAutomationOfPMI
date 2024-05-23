import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getPaymentInfo = state =>
  state.application.paymentInfo.entity ? state.application.paymentInfo.entity : undefined;

export const getPaymentInfoStatus = state =>
  state.application.paymentInfo.entity ? state.application.paymentInfo.status : ApiStatus.Idle;
