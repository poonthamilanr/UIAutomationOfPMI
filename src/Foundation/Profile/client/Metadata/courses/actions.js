import { createAction } from "redux-actions";

export const FETCH_COURSES_REQUEST = "FETCH_COURSES_REQUEST";
export const FETCH_COURSES_SUCCESS = "FETCH_COURSES_SUCCESS";
export const FETCH_COURSES_FAILURE = "FETCH_COURSES_FAILURE";

export const fetchCourses = createAction(
  FETCH_COURSES_REQUEST,
  data => data,
);
export const fetchCoursesSuccess = createAction(
  FETCH_COURSES_SUCCESS,
  data => data,
);
export const fetchCoursesFailure = createAction(
  FETCH_COURSES_FAILURE,
  data => data,
);
