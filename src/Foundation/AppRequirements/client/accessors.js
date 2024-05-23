import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getAcademicEducation } from "foundation/Application/client/AcademicEducation/accessors";
import { getEducationRequirementsMet } from "foundation/Application/client/ProfessionalEducation/accessors";
import { getAppExperienceSummariesRequirementsMet } from 'foundation/Application/client/ExperienceSummaries/accessors';
import { getExperienceRequirement } from 'foundation/Application/client/Experience/accessors';

export const getAppRequirements = state => state.appRequirements.entity;

export const getAppRequirementsStatus = state =>
  getAppRequirements(state) ? state.appRequirements.status : ApiStatus.Idle;

export const getAppRequirementsStatusPending = state =>
  getAppRequirementsStatus(state) === ApiStatus.Fetching;

export const getRequirementMet = (requirementType, worktypes) => state => {
  switch (requirementType) {
  case 'Education':
    return getAcademicEducation(state) && getEducationRequirementsMet(state);
  case 'ExperienceSummaries':
    return getAppExperienceSummariesRequirementsMet(state);
  case 'Experience': {
    return worktypes ? worktypes.every(worktype => getExperienceRequirement(worktype.value)(state).requirementMet) : true;
  }
  default:
    return true;
  }
};

// TODO: Move to \Foundation\Application\client\AcademicEducation\accessors.js
export const getAcademicEducationReqirements = state =>
  getAcademicEducation(state);
export const getAppEducationReqirements = state =>
  getAppRequirements(state) && getAppRequirements(state).educationRequirements;
export const getAppEducationReqirementsMet = state =>
  getAppEducationReqirements(state) && getAppEducationReqirements(state).requirementMet;
