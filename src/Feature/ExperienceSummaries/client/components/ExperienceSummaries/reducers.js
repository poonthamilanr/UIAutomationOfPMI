import { combineReducers } from 'redux';
import experienceSummariesQAReducer from "../ExperienceSummariesQA/reducers";
import editExperienceSummariesQAReducer from "../EditExperienceSummariesQA/reducers";

const experienceSummariesReducers = combineReducers({
  experienceSummariesQA: experienceSummariesQAReducer,
  editExperienceSummariesQA: editExperienceSummariesQAReducer,
});

export default experienceSummariesReducers;