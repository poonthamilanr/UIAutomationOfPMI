import { createAction } from "redux-actions";

export const FETCH_PROFESSIONAL_EDUCATION_REQUEST = "FETCH_PROFESSIONAL_EDUCATION_REQUEST";
export const FETCH_PROFESSIONAL_EDUCATION_SUCCESS = "FETCH_PROFESSIONAL_EDUCATION_SUCCESS";
export const FETCH_PROFESSIONAL_EDUCATION_FAILURE = "FETCH_PROFESSIONAL_EDUCATION_FAILURE";
export const SAVE_PROFESSIONAL_EDUCATION_REQUEST = "SAVE_PROFESSIONAL_EDUCATION_REQUEST";
export const SAVE_PROFESSIONAL_EDUCATION_SUCCESS = "SAVE_PROFESSIONAL_EDUCATION_SUCCESS";
export const SAVE_PROFESSIONAL_EDUCATION_FAILURE = "SAVE_PROFESSIONAL_EDUCATION_FAILURE";
export const DELETE_PROFESSIONAL_EDUCATION_REQUEST = "DELETE_PROFESSIONAL_EDUCATION_REQUEST";
export const DELETE_PROFESSIONAL_EDUCATION_SUCCESS = "DELETE_PROFESSIONAL_EDUCATION_SUCCESS";
export const DELETE_PROFESSIONAL_EDUCATION_FAILURE = "DELETE_PROFESSIONAL_EDUCATION_FAILURE";

export const fetchProfessionalEducation = createAction(FETCH_PROFESSIONAL_EDUCATION_REQUEST, data => data);
export const fetchProfessionalEducationSuccess = createAction(FETCH_PROFESSIONAL_EDUCATION_SUCCESS, data => data);
export const fetchProfessionalEducationFailure = createAction(FETCH_PROFESSIONAL_EDUCATION_FAILURE, data => data);

export const saveProfessionalEducation = createAction(SAVE_PROFESSIONAL_EDUCATION_REQUEST, data => data);
export const saveProfessionalEducationSuccess = createAction(SAVE_PROFESSIONAL_EDUCATION_SUCCESS, data => data);
export const saveProfessionalEducationFailure = createAction(SAVE_PROFESSIONAL_EDUCATION_FAILURE, data => data);

export const deleteProfessionalEducation = createAction(DELETE_PROFESSIONAL_EDUCATION_REQUEST, data => data);
export const deleteProfessionalEducationSuccess = createAction(DELETE_PROFESSIONAL_EDUCATION_SUCCESS, data => data);
export const deleteProfessionalEducationFailure = createAction(DELETE_PROFESSIONAL_EDUCATION_FAILURE, data => data);
