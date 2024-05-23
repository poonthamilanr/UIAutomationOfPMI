import { takeLatest } from "redux-saga/effects";
import * as actions from "./actions";

function trackPageView({payload}) {
  window.s.pageName = payload.pageName;
  window.s.eVar29 = window.location.origin + window.location.pathname;
  window.s.prop29 = window.location.origin + window.location.pathname;
  window.s.eVar30 = window.location.href;
  window.s.prop30 = window.location.href;
  window.s.t();
}

function* watchTrackPageView() {
  yield takeLatest(actions.TRACK_PAGE_VIEW, trackPageView);
}

export default [
  watchTrackPageView,
];
