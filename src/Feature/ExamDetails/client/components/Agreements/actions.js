import { createAction } from "redux-actions";

export const AGREEMENTS_SET_VALIDITY = "AGREEMENTS_SET_VALIDITY";

export const setValidity = createAction(AGREEMENTS_SET_VALIDITY, status => status);
