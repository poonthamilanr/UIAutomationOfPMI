import { combineReducers } from 'redux';
import addressReducer from "../Address/reducers";
import emailReducer from "../Email/reducers";
import phoneReducer from "../Phone/reducers";
import nameReducer from "../Name/reducers";
import nameOnCertificateReducer from '../NameOnCertificate/reducers';
import agreementsReducer from "../Agreements/reducers";
import submitAppInitiatedReducer from "../ExamDetailsSubmitButton/reducers";
import examLocationReducer from "../ExamLocation/reducers";

const examDetailsReducers = combineReducers({
  forms: combineReducers({
    address: addressReducer,
    name: nameReducer,
    nameOnCertificate: nameOnCertificateReducer,
    email: emailReducer,
    phone: phoneReducer,
    agreements: agreementsReducer,
    location: examLocationReducer,
  }),
  submitAppInitiated: submitAppInitiatedReducer,
})

export default examDetailsReducers;
