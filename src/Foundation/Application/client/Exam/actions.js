import { createAction } from "redux-actions";

export const FETCH_EXAMS_REQUEST = "FETCH_EXAMS_REQUEST";
export const FETCH_EXAMS_SUCCESS = "FETCH_EXAMS_SUCCESS";
export const FETCH_EXAMS_FAILURE = "FETCH_EXAMS_FAILURE";

export const fetchExams = createAction(FETCH_EXAMS_REQUEST, data => data);
export const fetchExamsSuccess = createAction(FETCH_EXAMS_SUCCESS, data => data);
export const fetchExamsFailure = createAction(FETCH_EXAMS_FAILURE, data => data);

export const SUBMIT_EXAM_DETAIL_REQUEST = "SUBMIT_EXAM_DETAIL_REQUEST";
export const SUBMIT_EXAM_DETAIL_SUCCESS = "SUBMIT_EXAM_DETAIL_SUCCESS";
export const SUBMIT_EXAM_DETAIL_FAILURE = "SUBMIT_EXAM_DETAIL_FAILURE";

export const submitExamDetail = createAction(SUBMIT_EXAM_DETAIL_REQUEST, data => data);
export const submitExamDetailSuccess = createAction(SUBMIT_EXAM_DETAIL_SUCCESS, data => data);
export const submitExamDetailFailure = createAction(SUBMIT_EXAM_DETAIL_FAILURE, data => data);