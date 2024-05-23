import { createAction } from "redux-actions";

export const FETCH_ACADEMIC_EDUCATION_REQUEST = "FETCH_ACADEMIC_EDUCATION_REQUEST";
export const FETCH_ACADEMIC_EDUCATION_SUCCESS = "FETCH_ACADEMIC_EDUCATION_SUCCESS";
export const FETCH_ACADEMIC_EDUCATION_FAILURE = "FETCH_ACADEMIC_EDUCATION_FAILURE";
export const SAVE_ACADEMIC_EDUCATION_REQUEST = "SAVE_ACADEMIC_EDUCATION_REQUEST";
export const SAVE_ACADEMIC_EDUCATION_SUCCESS = "SAVE_ACADEMIC_EDUCATION_SUCCESS";
export const SAVE_ACADEMIC_EDUCATION_FAILURE = "SAVE_ACADEMIC_EDUCATION_FAILURE";

export const fetchAcademicEducation = createAction(FETCH_ACADEMIC_EDUCATION_REQUEST, data => data);
export const fetchAcademicEducationSuccess = createAction(FETCH_ACADEMIC_EDUCATION_SUCCESS, data => data);
export const fetchAcademicEducationFailure = createAction(FETCH_ACADEMIC_EDUCATION_FAILURE, data => data);

export const saveAcademicEducation = createAction(SAVE_ACADEMIC_EDUCATION_REQUEST, data => data);
export const saveAcademicEducationSuccess = createAction(SAVE_ACADEMIC_EDUCATION_SUCCESS, data => data);
export const saveAcademicEducationFailure = createAction(SAVE_ACADEMIC_EDUCATION_FAILURE, data => data);
