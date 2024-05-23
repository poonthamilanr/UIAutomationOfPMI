import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

const extractExperienceId = answer => {
  const href = answer && answer._links && answer._links.self && answer._links.self.href;
  const matched = href && href.toLocaleLowerCase().match(/experience\/([0-9]+)$/);
  return matched && matched[1] && Number(matched[1]);
};

const expandExperience = experience => ({
  id: extractExperienceId(experience),
  ...experience,
});

export const getExperience = state => {
  const entity = state.application.experience.entity;
  return entity && entity.map(expandExperience);
};

export const getExperienceStatus = state =>
  state.application.experience.entity ? state.application.experience.status : ApiStatus.Idle;
export const getExperienceSubStatus = state =>
  state.application.experience.entity ? state.application.experience.subStatus : ApiStatus.Idle;

export const getIsSavingStatus = state => getExperienceStatus(state) === ApiStatus.Submitting;
export const getIsSavingSubStatus = state => getExperienceSubStatus(state) === ApiStatus.Submitting;

export const getExperienceRequirements = state => state.appRequirements.entity ? state.appRequirements.entity.experienceRequirements : {};

export const getExperienceRequirement = worktype => state => getExperienceRequirements(state)[worktype] ? getExperienceRequirements(state)[worktype] : {};
