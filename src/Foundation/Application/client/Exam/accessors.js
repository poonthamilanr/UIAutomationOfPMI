import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

const extractReference = (links, name) => links && links[name] && links[name].href;

export const getExams = state =>
  state.application.exams.entity ? state.application.name.entity : undefined;

export const getActiveExam = state =>
  getExams(state) && getExams(state).find(exam => exam.isActive);

export const getExamStatus = state =>
  state.application.exams.entity ? state.application.exams.status : ApiStatus.Idle;

export const getMcExam = state =>
  state.application.exams.entity ? state.application.exams.entity : undefined;

export const getMcExamType = state =>
  getMcExam(state) && getMcExam(state).certificationTypeEnum;

export const getMcExamApi = state =>
  getMcExam(state) && extractReference(getMcExam(state)._links, 'self');