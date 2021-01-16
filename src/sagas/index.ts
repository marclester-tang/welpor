import { all, fork } from "redux-saga/effects";

import catSaga from "./cat.saga";

export default function* rootSaga() {
  yield all([
    fork(catSaga),
  ]);
}
