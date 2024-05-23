import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getNameOnCertificate = state =>
  state.application.nameOnCertificate.entity ? state.application.nameOnCertificate.entity : undefined;

export const getNameOnCertificateStatus = state =>
  state.application.nameOnCertificate ? state.application.nameOnCertificate.status : ApiStatus.Idle;
