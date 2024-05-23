import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getApplicationFlowRequestIdle = state => state.application.applicationFlow.status === ApiStatus.Idle;

export const getApplicationFlow = state =>
  state.application.applicationFlow ? state.application.applicationFlow.entity : undefined;

export const getApplicationFlowStatus = state =>
  state.application.applicationFlow.entity ? state.application.applicationFlow.status : ApiStatus.Idle;