import { createAction } from "redux-actions";

export const EDIT_EXPERIENCE_SUMMARIES_QA_SET_UI_OPEN_REF = "EDIT_EXPERIENCE_SUMMARIES_QA_SET_UI_OPEN_REF";
export const EDIT_EXPERIENCE_SUMMARIES_QA_CLEAR_UI_OPEN_REF = "EDIT_EXPERIENCE_SUMMARIES_QA_CLEAR_UI_OPEN_REF";

export const setOpenRef = createAction(EDIT_EXPERIENCE_SUMMARIES_QA_SET_UI_OPEN_REF, ref => ref);
export const clearOpenRef = createAction(EDIT_EXPERIENCE_SUMMARIES_QA_CLEAR_UI_OPEN_REF, ref => ref);