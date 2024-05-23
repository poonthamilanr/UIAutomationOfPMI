import { createAction } from "redux-actions";

export const EXPERIENCE_PROGRAM_SET_UI_OPEN_REF = "EXPERIENCE_PROGRAM_SET_UI_OPEN_REF";
export const EXPERIENCE_PROGRAM_SET_UI_OPEN_SUB_REF = "EXPERIENCE_PROGRAM_SET_UI_OPEN_SUB_REF";

export const setOpenRef = createAction(EXPERIENCE_PROGRAM_SET_UI_OPEN_REF, ref => ref);
export const setOpenSubRef = createAction(EXPERIENCE_PROGRAM_SET_UI_OPEN_SUB_REF, ref => ref);
