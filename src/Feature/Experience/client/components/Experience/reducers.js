import { combineReducers } from 'redux';
import projectReducer from "../Project/reducers";
import agileReducer from "../Agile/reducers";
import businessAnalysisReducer from "../BusinessAnalysis/reducers";
import programReducer from "../Program/reducers";
import subProjectReducer from "../Program/SubProjects/reducers";
import portfolioReducer from "../Portfolio/reducers";

const experienceReducers = combineReducers({
  project: projectReducer,
  agile: agileReducer,
  businessAnalysis: businessAnalysisReducer,
  program: programReducer,
  portfolio: portfolioReducer,
  subProject: subProjectReducer,
});

export default experienceReducers;
