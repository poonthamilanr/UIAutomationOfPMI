import { createAction } from "redux-actions";

export const SAVE_EXAMLOCATION_REQUEST = "SAVE_EXAMLOCATION_REQUEST";
export const SAVE_EXAMLOCATION_SUCCESS = "SAVE_EXAMLOCATION_SUCCESS";
export const SAVE_EXAMLOCATION_FAILURE = "SAVE_EXAMLOCATION_FAILURE";

export const saveExamLocation = createAction(SAVE_EXAMLOCATION_REQUEST, data => data);
export const saveExamLocationSuccess = createAction(SAVE_EXAMLOCATION_SUCCESS, data => data);
export const saveExamLocationFailure = createAction(SAVE_EXAMLOCATION_FAILURE, data => data);

export const SAVE_EXAMACCOMMODATION_REQUEST = "SAVE_EXAMACCOMMODATION_REQUEST";
export const SAVE_EXAMACCOMMODATION_SUCCESS = "SAVE_EXAMACCOMMODATION_SUCCESS";
export const SAVE_EXAMACCOMMODATION_FAILURE = "SAVE_EXAMACCOMMODATION_FAILURE";

export const saveExamAccommodation = createAction(SAVE_EXAMACCOMMODATION_REQUEST, data => data);
export const saveExamAccommodationSuccess = createAction(SAVE_EXAMACCOMMODATION_SUCCESS, data => data);
export const saveExamAccommodationFailure = createAction(SAVE_EXAMACCOMMODATION_FAILURE, data => data);
