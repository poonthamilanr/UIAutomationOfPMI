const extractQuestionId = question => {
  const href = question && question._links && question._links.self && question._links.self.href;
  const matched = href && href.toLocaleLowerCase().match(/questions\/([0-9]+)$/);
  return matched && matched[1] && Number(matched[1]);
}

function expandQuestion(question) {
  const titleMatch = question.displayText.match(/#.:\s(.*?)</);
  const optionAMatch = question.displayText.match(/>A.\s(.*?)<br\/>/);
  const optionBMatch = question.displayText.match(/>B.\s(.*$)/);

  return {
    id: extractQuestionId(question),
    ...question,
    optionA: optionAMatch && optionAMatch[1],
    optionB: optionBMatch && optionBMatch[1],
    title: titleMatch && titleMatch[1],
  };
}

export const getExperienceSummariesEntity = state => {
  const entity = state.application.experienceSummaries.entity;
  const bySortOrder = (a, b) => (a.sortOrder - b.sortOrder) || 0;
  return entity ? entity.map(expandQuestion).sort(bySortOrder) : null;
}

export const getAppRequirements = state => state.appRequirements.entity;

export const getAppExperienceSummariesRequirements = state =>
  getAppRequirements(state) && getAppRequirements(state).experienceSummariesRequirements;

export const getAppExperienceSummariesRequirementsMet = state =>
  getAppExperienceSummariesRequirements(state) && getAppExperienceSummariesRequirements(state).requirementMet;

export const getAppExperienceSummariesRequirementsAnswerDetails = state =>
  getAppExperienceSummariesRequirements(state) && getAppExperienceSummariesRequirements(state).answerDetails;

export const getIsExperienceSummarieceNotUpdated = state => {
  const entity = getExperienceSummariesEntity(state);
  const result = entity && entity.find(item => item.answer.updated === false);
  if (result) {
    return true;
  }
  return false;
}

export const getIsExperienceSummarieceEntity = state => {
  const entity = getExperienceSummariesEntity(state);
  return !entity;
}

export const getExperienceSummariesApi = state =>
  state.application.experienceSummaries.apiUrl ? state.application.experienceSummaries.apiUrl : null;