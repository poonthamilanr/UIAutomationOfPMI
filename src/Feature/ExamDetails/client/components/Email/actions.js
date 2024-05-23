import { createAction } from "redux-actions";

export const EMAIL_SET_UI_IS_OPEN = "EMAIL_SET_UI_IS_OPEN";

export const setIsOpen = createAction(EMAIL_SET_UI_IS_OPEN, status => status);