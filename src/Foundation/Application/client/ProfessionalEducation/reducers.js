import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const replaceArrayElement = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

const getProfEducationIndexByLink = (link, list) => list.findIndex(
  education => (
    education._links &&
    education._links.self.href.toLowerCase() === link.toLowerCase()
  ),
);

const initialState = {
  status: ApiStatus.Idle,
  entity: [],
};

const professionalEducationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_PROFESSIONAL_EDUCATION_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_PROFESSIONAL_EDUCATION_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_PROFESSIONAL_EDUCATION_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.SAVE_PROFESSIONAL_EDUCATION_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.SAVE_PROFESSIONAL_EDUCATION_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.SAVE_PROFESSIONAL_EDUCATION_SUCCESS:
    let index = getProfEducationIndexByLink(action.payload._links.self.href, state.entity);
    if (index < 0) {
      index = state.entity.length;
    }
    return {
      entity: replaceArrayElement([...state.entity], index, action.payload),
      status: ApiStatus.Success,
    };
  case actions.DELETE_PROFESSIONAL_EDUCATION_SUCCESS:
    const entity = [...state.entity];
    entity.splice( getProfEducationIndexByLink(action.payload, state.entity), 1 );
    return {
      entity,
      status: ApiStatus.Success,
    };
  default:
    return state;
  }
};

export default professionalEducationReducer;
