import { createAction } from "redux-actions";

export const EXPERIENCE_SUBPROJECT_SET_UI_OPEN_REF = "EXPERIENCE_SUBPROJECT_SET_UI_OPEN_REF";

export const setOpenRef = createAction(EXPERIENCE_SUBPROJECT_SET_UI_OPEN_REF, ref => ref);