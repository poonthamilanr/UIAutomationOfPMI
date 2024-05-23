import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
  apiUrl: null,
};

function putchQuestions(questions, answer) {
  return questions.map(question => {
    const isEqualRef = question._links.answer.href === answer._links.self.href;
    return isEqualRef ? {...question, answer} : question;
  });
}

const experienceSummariesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_OPEN_EXPERIENCE_SUMMARIES_REQUEST:
    return {
      ...state,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_OPEN_EXPERIENCE_SUMMARIES_SUCCESS:
    return {
      ...state,
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_OPEN_EXPERIENCE_SUMMARIES_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.SAVE_EXPERIENCE_SUMMARIES_ANSWER_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.SAVE_EXPERIENCE_SUMMARIES_ANSWER_SUCCESS:
    return {
      ...state,
      entity: putchQuestions(state.entity, action.payload),
      status: ApiStatus.Success,
    };
  case actions.SAVE_EXPERIENCE_SUMMARIES_ANSWER_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.SUBMIT_EXPERIENCE_SUMMARIES_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.SUBMIT_EXPERIENCE_SUMMARIES_SUCCESS:
    return {
      ...state,
      status: ApiStatus.Success,
    };
  case actions.SUBMIT_EXPERIENCE_SUMMARIES_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.SET_EXPERIENCE_SUMMARIES_API_URL:
    return {
      ...state,
      apiUrl: action.payload,
    };

  default:
    return state;
  }
};

export default experienceSummariesReducer;
