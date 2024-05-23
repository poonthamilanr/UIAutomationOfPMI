import { createAction } from "redux-actions";

export const ADDRESS_SET_UI_IS_OPEN = "ADDRESS_SET_UI_IS_OPEN";

export const setIsOpen = createAction(ADDRESS_SET_UI_IS_OPEN, status => status);