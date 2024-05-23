import { createAction } from "redux-actions";

export const EXPERIENCE_SUMMARIES_QA_SET_UI_OPEN_REF = "EXPERIENCE_SUMMARIES_QA_SET_UI_OPEN_REF";
export const EXPERIENCE_SUMMARIES_QA_CLEAR_UI_OPEN_REF = "EXPERIENCE_SUMMARIES_QA_CLEAR_UI_OPEN_REF";

export const setOpenRef = createAction(EXPERIENCE_SUMMARIES_QA_SET_UI_OPEN_REF, ref => ref);
export const clearOpenRef = createAction(EXPERIENCE_SUMMARIES_QA_CLEAR_UI_OPEN_REF, ref => ref);