import { createAction } from "redux-actions";

export const EXPERIENCE_BUSINESS_ANALYSIS_SET_UI_OPEN_REF = "EXPERIENCE_BUSINESS_ANALYSIS_SET_UI_OPEN_REF";

export const setOpenRef = createAction(EXPERIENCE_BUSINESS_ANALYSIS_SET_UI_OPEN_REF, ref => ref);
