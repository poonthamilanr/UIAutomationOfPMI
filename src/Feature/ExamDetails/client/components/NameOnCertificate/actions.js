import { createAction } from "redux-actions";

export const NAME_ON_CERTIFICATE_SET_UI_IS_OPEN = "NAME_ON_CERTIFICATE_SET_UI_IS_OPEN";

export const setIsOpen = createAction(NAME_ON_CERTIFICATE_SET_UI_IS_OPEN, status => status);