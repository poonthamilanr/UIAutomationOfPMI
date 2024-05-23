import { createAction } from "redux-actions";

export const FETCH_EXPERIENCE_REQUEST = "FETCH_EXPERIENCE_REQUEST";
export const FETCH_EXPERIENCE_SUCCESS = "FETCH_EXPERIENCE_SUCCESS";
export const FETCH_EXPERIENCE_FAILURE = "FETCH_EXPERIENCE_FAILURE";
export const FETCH_EXPERIENCE_SUBPROJECTS_REQUEST = "FETCH_EXPERIENCE_SUBPROJECTS_REQUEST";
export const FETCH_EXPERIENCE_SUBPROJECTS_SUCCESS = "FETCH_EXPERIENCE_SUBPROJECTS_SUCCESS";
export const FETCH_EXPERIENCE_SUBPROJECTS_FAILURE = "FETCH_EXPERIENCE_SUBPROJECTS_FAILURE";
export const SAVE_EXPERIENCE_REQUEST = "SAVE_EXPERIENCE_REQUEST";
export const SAVE_EXPERIENCE_SUCCESS = "SAVE_EXPERIENCE_SUCCESS";
export const SAVE_EXPERIENCE_FAILURE = "SAVE_EXPERIENCE_FAILURE";
export const BUFFER_EXPERIENCE_REQUEST = "BUFFER_EXPERIENCE_REQUEST";
export const BUFFER_EXPERIENCE_SUCCESS = "BUFFER_EXPERIENCE_SUCCESS";
export const BUFFER_EXPERIENCE_FAILURE = "BUFFER_EXPERIENCE_FAILURE";
export const DELETE_EXPERIENCE_REQUEST = "DELETE_EXPERIENCE_REQUEST";
export const DELETE_EXPERIENCE_SUCCESS = "DELETE_EXPERIENCE_SUCCESS";
export const DELETE_EXPERIENCE_FAILURE = "DELETE_EXPERIENCE_FAILURE";
export const SAVE_SUBPROJECT_REQUEST = "SAVE_SUBPROJECT_REQUEST";
export const SAVE_SUBPROJECT_SUCCESS = "SAVE_SUBPROJECT_SUCCESS";
export const SAVE_SUBPROJECT_FAILURE = "SAVE_SUBPROJECT_FAILURE";
export const DELETE_SUBPROJECT_REQUEST = "DELETE_SUBPROJECT_REQUEST";
export const DELETE_SUBPROJECT_SUCCESS = "DELETE_SUBPROJECT_SUCCESS";
export const DELETE_SUBPROJECT_FAILURE = "DELETE_SUBPROJECT_FAILURE";
export const SAVE_COMPLETE_EXPERIENCE_REQUEST = "SAVE_COMPLETE_EXPERIENCE_REQUEST";
export const SAVE_COMPLETE_EXPERIENCE_SUCCESS = "SAVE_COMPLETE_EXPERIENCE_SUCCESS";
export const SAVE_COMPLETE_EXPERIENCE_FAILURE = "SAVE_COMPLETE_EXPERIENCE_FAILURE";

export const fetchExperience = createAction(FETCH_EXPERIENCE_REQUEST, data => data);
export const fetchExperienceSuccess = createAction(FETCH_EXPERIENCE_SUCCESS, data => data);
export const fetchExperienceFailure = createAction(FETCH_EXPERIENCE_FAILURE, data => data);

export const fetchExperienceSubprojects = createAction(FETCH_EXPERIENCE_SUBPROJECTS_REQUEST, data => data);
export const fetchExperienceSubprojectsSuccess = createAction(FETCH_EXPERIENCE_SUBPROJECTS_SUCCESS, data => data);
export const fetchExperienceSubprojectsFailure = createAction(FETCH_EXPERIENCE_SUBPROJECTS_FAILURE, data => data);

export const saveExperience = createAction(SAVE_EXPERIENCE_REQUEST, data => data);
export const saveExperienceSuccess = createAction(SAVE_EXPERIENCE_SUCCESS, data => data);
export const saveExperienceFailure = createAction(SAVE_EXPERIENCE_FAILURE, data => data);

export const bufferExperience = createAction(BUFFER_EXPERIENCE_REQUEST, data => data);
export const bufferExperienceSuccess = createAction(BUFFER_EXPERIENCE_SUCCESS, data => data);
export const bufferExperienceFailure = createAction(BUFFER_EXPERIENCE_FAILURE, data => data);

export const deleteExperience = createAction(DELETE_EXPERIENCE_REQUEST, data => data);
export const deleteExperienceSuccess = createAction(DELETE_EXPERIENCE_SUCCESS, data => data);
export const deleteExperienceFailure = createAction(DELETE_EXPERIENCE_FAILURE, data => data);

export const saveSubProject = createAction(SAVE_SUBPROJECT_REQUEST, data => data);
export const saveSubProjectSuccess = createAction(SAVE_SUBPROJECT_SUCCESS, data => data);
export const saveSubProjectFailure = createAction(SAVE_SUBPROJECT_FAILURE, data => data);

export const deleteSubProject = createAction(DELETE_SUBPROJECT_REQUEST, data => data);
export const deleteSubProjectSuccess = createAction(DELETE_SUBPROJECT_SUCCESS, data => data);
export const deleteSubProjectFailure = createAction(DELETE_SUBPROJECT_FAILURE, data => data);

export const saveCompleteExperience = createAction(SAVE_COMPLETE_EXPERIENCE_REQUEST, data => data);
export const saveCompleteExperienceSuccess = createAction(SAVE_COMPLETE_EXPERIENCE_SUCCESS, data => data);
export const saveCompleteExperienceFailure = createAction(SAVE_COMPLETE_EXPERIENCE_FAILURE, data => data);
