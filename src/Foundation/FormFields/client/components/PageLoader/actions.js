import { createAction } from "redux-actions";

export const SHOW_PAGE_LOADER = "SHOW_PAGE_LOADER";
export const HIDE_PAGE_LOADER = "HIDE_PAGE_LOADER";

export const showPageLoader = createAction(SHOW_PAGE_LOADER);
export const hidePageLoader = createAction(HIDE_PAGE_LOADER);