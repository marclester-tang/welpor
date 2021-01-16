import { fork, takeLatest } from "redux-saga/effects";

function* getBreeds(action) {
}

export default function* catSaga() {
    yield takeLatest(actionTypes.GET_BALANCE.REQUEST, getBreeds);
}
