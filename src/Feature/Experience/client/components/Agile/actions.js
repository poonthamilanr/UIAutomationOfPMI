import { createAction } from "redux-actions";

export const EXPERIENCE_AGILE_SET_UI_OPEN_REF = "EXPERIENCE_AGILE_SET_UI_OPEN_REF";

export const setOpenRef = createAction(EXPERIENCE_AGILE_SET_UI_OPEN_REF, ref => ref);