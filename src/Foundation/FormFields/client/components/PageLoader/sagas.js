import { takeLatest } from "redux-saga/effects";
import * as actions from "./actions";

function* onPageLoaderHide() {
  if (window) {
    yield window.scrollTo(0, 0);
  }
}

function* watchPageLoaderHide() {
  yield takeLatest(actions.HIDE_PAGE_LOADER, onPageLoaderHide);
}

const pageLoaderSagaWatchers = [
  watchPageLoaderHide,
];

export default pageLoaderSagaWatchers;