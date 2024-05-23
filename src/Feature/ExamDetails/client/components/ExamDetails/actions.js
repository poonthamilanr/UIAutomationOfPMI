import { createAction } from "redux-actions";

export const OPEN_EXAM_DETAILS_PAGE_FORM = "OPEN_EXAM_DETAILS_PAGE_FORM";

export const openForm = createAction(OPEN_EXAM_DETAILS_PAGE_FORM, formKey => formKey);