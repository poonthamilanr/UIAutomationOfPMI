import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getAppDataRequestIdle = state => state.appStart.status === ApiStatus.Idle;