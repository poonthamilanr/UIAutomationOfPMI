import { createAction } from "redux-actions";

export const PROFESSIONAL_EDUCATION_SET_UI_OPEN_REF = "PROFESSIONAL_EDUCATION_SET_UI_OPEN_REF";

export const setOpenRef = createAction(PROFESSIONAL_EDUCATION_SET_UI_OPEN_REF, ref => ref);