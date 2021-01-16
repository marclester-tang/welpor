import { all, fork } from "redux-saga/effects";

import catSaga from "./catSaga";

export function* rootSaga() {
  yield all([
    fork(catSaga),
  ]);
}
