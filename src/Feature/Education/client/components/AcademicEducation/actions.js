import { createAction } from "redux-actions";

export const ACADEMIC_EDUCATION_SET_UI_IS_OPEN = "ACADEMIC_EDUCATION_SET_UI_IS_OPEN";

export const setIsOpen = createAction(ACADEMIC_EDUCATION_SET_UI_IS_OPEN, isOpen => isOpen);