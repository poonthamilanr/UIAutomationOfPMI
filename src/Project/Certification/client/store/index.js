import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"; // eslint-disable-line import/no-extraneous-dependencies
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });
const composeEnhancers =
  // composeWithDevTools({});
  process.env.NODE_ENV !== "production"
    ? composeWithDevTools({
      // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    })
    : compose;

const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    // other store enhancers if any
  ),
);
export default store;

// // run saga watchers
sagaMiddleware.run(rootSaga);
