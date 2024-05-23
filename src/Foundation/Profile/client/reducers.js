import { combineReducers } from 'redux';
import profileReducer from "./Profile/reducers";
import addressesReducer from "./Address/reducers";
import emailReducer from "./Email/reducers";
import phonesReducer from "./Phone/reducers";
import countriesReducer from "./Metadata/countries/reducers";
import accreditedUniversitiesReducer from "./Metadata/accreditedUniversities/reducers";
import providersReducer from "./Metadata/providers/reducers"
import coursesReducer from "./Metadata/courses/reducers"
import profileImageUrlReducer from "./Image/reducers";

export const profileInfoReducers = {
  profile: combineReducers({
    profile: profileReducer,
    addresses: addressesReducer,
    email: emailReducer,
    phones: phonesReducer,
    image: profileImageUrlReducer,
  }),
};
export const profileMetadataReducers = {
  metadata: combineReducers({
    countries: countriesReducer,
    accreditedUniversities: accreditedUniversitiesReducer,
    providers: providersReducer,
    courses: coursesReducer,
  }),
};
