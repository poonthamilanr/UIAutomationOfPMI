import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const patchCollectionByLink = (_list, link, data) => {
  const list = _list ? JSON.parse(JSON.stringify(_list)) : []; // avoid mutating state
  const isSame = doc => doc._links && doc._links.self.href.toLowerCase() === link.toLowerCase();
  const index = list.findIndex(isSame);

  if (!data) {
    return list.filter(doc => !isSame(doc));
  }

  if (index >= 0) {
    return list.map(doc => isSame(doc) ? {...doc, ...data, endDate: data.endDate || null} : doc); // new data may not have subProjects, have to keep them from doc
  }

  return [...list, data];
}

const patchSubProjectsByLink = (_list, link, data) => {
  const list = _list ? JSON.parse(JSON.stringify(_list)) : []; // avoid mutating state
  const experienceLink = link.split('/ExperienceProjects/')[0];
  const isSame = doc => doc._links && doc._links.self.href.toLowerCase() === experienceLink.toLowerCase();
  const experienceIndex = list.findIndex(isSame);

  if (experienceIndex >= 0) {
    list[experienceIndex].subProjects = patchCollectionByLink(list[experienceIndex].subProjects, link, data);
  }

  return list;
}

const initialState = {
  status: ApiStatus.Idle,
  subStatus: ApiStatus.Idle,
  entity: [],
};

const experienceReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_EXPERIENCE_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_EXPERIENCE_SUBPROJECTS_REQUEST:
    return {
      ...state,
      status: ApiStatus.Fetching,
    }
  case actions.FETCH_EXPERIENCE_SUCCESS:
  case actions.FETCH_EXPERIENCE_SUBPROJECTS_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
      subStatus: ApiStatus.Success,
    };
  case actions.FETCH_EXPERIENCE_FAILURE:
  case actions.FETCH_EXPERIENCE_SUBPROJECTS_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
      subStatus: ApiStatus.Failure,
    };
  case actions.SAVE_EXPERIENCE_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.SAVE_EXPERIENCE_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.SAVE_EXPERIENCE_SUCCESS:
    return {
      ...state,
      entity: patchCollectionByLink(state.entity, action.payload._links.self.href, action.payload),
      status: ApiStatus.Success,
    };
  case actions.BUFFER_EXPERIENCE_SUCCESS:
    return {
      ...state,
      entity: patchCollectionByLink(state.entity, action.payload._links.self.href, action.payload),
    };
  case actions.DELETE_EXPERIENCE_SUCCESS:
    return {
      ...state,
      entity: patchCollectionByLink(state.entity, action.payload),
      status: ApiStatus.Success,
    };

  case actions.SAVE_SUBPROJECT_REQUEST:
    return {
      ...state,
      subStatus: ApiStatus.Submitting,
    };
  case actions.SAVE_SUBPROJECT_FAILURE:
    return {
      ...state,
      subStatus: ApiStatus.Failure,
    };
  case actions.SAVE_SUBPROJECT_SUCCESS:
    return {
      ...state,
      entity: patchSubProjectsByLink(state.entity, action.payload._links.self.href, action.payload),
      subStatus: ApiStatus.Success,
    };
  case actions.DELETE_SUBPROJECT_SUCCESS:
    return {
      ...state,
      entity: patchSubProjectsByLink(state.entity, action.payload),
      subStatus: ApiStatus.Success,
    };
  case actions.SAVE_COMPLETE_EXPERIENCE_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.SAVE_COMPLETE_EXPERIENCE_SUCCESS:
    return {
      ...state,
      entity: patchCollectionByLink(state.entity, action.payload._links.self.href, action.payload),
      status: ApiStatus.Success,
    };

  default:
    return state;
  }
};

export default experienceReducer;
