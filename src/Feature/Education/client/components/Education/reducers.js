import { combineReducers } from 'redux';
import academicAducactionReducer from "../AcademicEducation/reducers";
import professionalEducationReducer from "../ProfessionalEducation/reducers";

const educationReducers = combineReducers({
  forms: combineReducers({
    academicEducation: academicAducactionReducer,
  }),
  professionalEducation: professionalEducationReducer,
});

export default educationReducers;
