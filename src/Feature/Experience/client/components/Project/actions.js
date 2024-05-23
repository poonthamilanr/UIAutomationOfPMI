import { createAction } from "redux-actions";

export const EXPERIENCE_PROJECT_SET_UI_OPEN_REF = "EXPERIENCE_PROJECT_SET_UI_OPEN_REF";

export const setOpenRef = createAction(EXPERIENCE_PROJECT_SET_UI_OPEN_REF, ref => ref);