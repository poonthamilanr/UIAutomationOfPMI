import { combineReducers } from 'redux';
import navigationReducer from "./Navigation/reducers";

export const navigationReducers = {
  navigation: combineReducers({
    navigation: navigationReducer,
  }),
};
