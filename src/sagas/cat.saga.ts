import { takeLatest, delay, put, select } from "redux-saga/effects";
import * as actionTypes from "../actions/cat.action";
import axios from "axios";

const CAT_API_URL = "https://api.thecatapi.com/v1/";

function* getBreeds(action: any) {
    try {
        const response = yield axios.get(`${CAT_API_URL}breeds`);
        if(response?.status === 200) {
            //Setup a timeout to show that saga works =)
            yield delay(1000);
            yield put({
                type: actionTypes.GET_BREEDS.SUCCESS,
                payload: response?.data
            });
        }
    }catch (e) {
        yield put({
            type: actionTypes.GET_BREEDS.FAILURE,
        });
    }
}

function* getCatsByBreed(action: any) {
    try {
        const {page, limit, id} = action?.payload;
        const response = yield axios.get(`${CAT_API_URL}images/search?page=${page}&limit=${limit}&breed_id=${id}`);
        let hideMore = false;
        if(response?.status === 200) {
            //Setup a timeout to show that saga works =)
            yield delay(2000);
            let payload = response?.data;
            if(page > 1){
                const cats = yield select((state) => state?.cat?.catsByBreed);
                const newCats = payload.filter((item: any)=>{
                    return !cats.some((cat: any)=>cat.id === item.id);
                });
                payload = [...cats, ...newCats];
                if(newCats.length === 0)
                    hideMore = true;
            }
            yield put({
                type: actionTypes.GET_CATS_BY_BREED.SUCCESS,
                payload
            });

            // this is the actual pagination but because there are repetitive images we cannot do this
            if(response?.data?.length === limit && !hideMore){
                yield put({
                    type: actionTypes.HAS_MORE,
                    payload: true
                });
            }else {
                yield put({
                    type: actionTypes.HAS_MORE,
                    payload: false
                });
            }
        }
    }catch (e) {
        yield put({
            type: actionTypes.GET_CATS_BY_BREED.FAILURE,
        });
    }
}

function* getCatDetails(action: any) {
    try {
        const {id} = action?.payload;
        const response = yield axios.get(`${CAT_API_URL}images/${id}`);
        if(response?.status === 200) {
            //Setup a timeout to show that saga works =)
            yield delay(1000);
            yield put({
                type: actionTypes.GET_CAT_DETAILS.SUCCESS,
                payload: response?.data
            });
        }
    }catch (e) {
        yield put({
            type: actionTypes.GET_CAT_DETAILS.FAILURE,
        });
    }
}

export default function* catSaga() {
    yield takeLatest(actionTypes.GET_BREEDS.REQUEST, getBreeds);
    yield takeLatest(actionTypes.GET_CATS_BY_BREED.REQUEST, getCatsByBreed);
    yield takeLatest(actionTypes.GET_CAT_DETAILS.REQUEST, getCatDetails);
}
