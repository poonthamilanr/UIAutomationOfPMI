import { getValidationSchemaByExperienceType, appendEndDate } from "foundation/Application/client/Experience/validationSchemas";
import { getWorkflowType } from 'foundation/Application/client/certtype-storage';

export const patchExperienceRequirements = (experienceRequirements, experiences) => {
  if (!experiences) {
    return experienceRequirements;
  }

  const updatedExperienceRequirements = {};
  Object.entries(experienceRequirements).map(([worktype, expTypeRequirement]) => {
    const { monthsRequired, monthsQualified, experienceDetails } = expTypeRequirement;
    let adjustedMonthsQualified = monthsQualified;

    const updatedDetails = !experienceDetails ? experienceDetails : experienceDetails.map(expRequirement => {
      const {isQualified, monthsQualified} = expRequirement;
      let uiRequirementsMet = isQualified;
      if (isQualified) {
        const experience = experiences.find(exp => exp.id === expRequirement.experienceId);
        if (experience) {
          const validationSchema = getValidationSchemaByExperienceType({}, experience.workExperienceTypeEnum, getWorkflowType());
          // Debug: uncomment to see validation error in console
          // try { validationSchema.validateSync({endDate: '2200-01-01', ...experienceInfo}); } catch(e) { console.log(e) }
          uiRequirementsMet = validationSchema ? validationSchema.isValidSync(appendEndDate(experience)) : true;
        }
        if (!uiRequirementsMet) {
          adjustedMonthsQualified -= expRequirement.monthsQualified;
        }
      }
      return {
        ...expRequirement,
        isQualified: isQualified && uiRequirementsMet,
        monthsQualified: isQualified && uiRequirementsMet ? monthsQualified : 0,
      };
    });
    if (adjustedMonthsQualified < 0) {
      adjustedMonthsQualified = 0;
    }

    updatedExperienceRequirements[worktype] = {
      ...expTypeRequirement,
      experienceDetails: updatedDetails,
      monthsQualified: adjustedMonthsQualified,
      requirementMet: adjustedMonthsQualified >= monthsRequired,
    }
    return null;
  })

  return updatedExperienceRequirements;
}