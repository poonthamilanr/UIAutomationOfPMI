import { createAction } from "redux-actions";

export const EXPERIENCE_PORTFOLIO_SET_UI_OPEN_REF = "EXPERIENCE_PORTFOLIO_SET_UI_OPEN_REF";

export const setOpenRef = createAction(EXPERIENCE_PORTFOLIO_SET_UI_OPEN_REF, ref => ref);