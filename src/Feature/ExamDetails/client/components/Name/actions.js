import { createAction } from "redux-actions";

export const NAME_SET_UI_IS_OPEN = "NAME_SET_UI_IS_OPEN";

export const setIsOpen = createAction(NAME_SET_UI_IS_OPEN, status => status);