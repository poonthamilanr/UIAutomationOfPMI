import { createAction } from "redux-actions";

export const TRACK_PAGE_VIEW = "TRACK_PAGE_VIEW";
export const SET_SCREEN_LOAD = "SET_SCREEN_LOAD";

export const trackPageView = createAction(TRACK_PAGE_VIEW, data => data);
export const setScreenLoad = createAction(SET_SCREEN_LOAD, data => data);
