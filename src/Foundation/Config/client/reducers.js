import { combineReducers } from 'redux';
import generalSettingsReducer from "./GeneralSettings/reducers";

export const configInfoReducers = {
  config: combineReducers({
    generalSettings: generalSettingsReducer,
  }),
};
