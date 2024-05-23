import { createAction } from "redux-actions";

export const PHONE_SET_UI_IS_OPEN = "PHONE_SET_UI_IS_OPEN";

export const setIsOpen = createAction(PHONE_SET_UI_IS_OPEN, status => status);