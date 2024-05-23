import { createAction } from "redux-actions";

export const SET_GLOBAL_SETTINGS = "SET_GLOBAL_SETTINGS";
export const SET_LISTS_SETTINGS = "SET_LISTS_SETTINGS";
export const SET_REQUIREMENTS_SETTINGS = "SET_REQUIREMENTS_SETTINGS";
export const SET_NAVIGATIONS_SETTINGS = "SET_NAVIGATIONS_SETTINGS";
export const SET_FOOTER_SETTINGS = "SET_FOOTER_SETTINGS"

export const setGlobalSettings = createAction(SET_GLOBAL_SETTINGS, data => data);
export const setListsSettings = createAction(SET_LISTS_SETTINGS, data => data);
export const setRequirementsSettings = createAction(SET_REQUIREMENTS_SETTINGS, data => data);
export const setNavigationsSettings = createAction(SET_NAVIGATIONS_SETTINGS, data => data);
export const setFooterSettings = createAction(SET_FOOTER_SETTINGS, data => data);