import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getGeneralSettings = state =>
  state.config.generalSettings.entity ? state.config.generalSettings.entity : undefined;

export const getGeneralSettingsStatus = state =>
  state.config.generalSettings.entity ? state.config.generalSettings.status : ApiStatus.Idle;

export const isNewAdobeEnabled = true;
