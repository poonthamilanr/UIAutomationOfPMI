import { createAction } from "redux-actions";

export const EXAM_LOCATION_SET_VALIDITY = "EXAM_LOCATION_SET_VALIDITY";

export const setValidity = createAction(EXAM_LOCATION_SET_VALIDITY, status => status);
