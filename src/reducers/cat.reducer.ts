import * as actionTypes from "../actions/cat.action";

const initialState = {
    getBreedStatus: "pending",
    getCatListStatus: "pending",
    breeds: null,
    catsByBreed: [],
    showMore: false,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_BREEDS.REQUEST:
            return {
                ...state,
                getBreedStatus: 'loading',
            };
        case actionTypes.GET_BREEDS.SUCCESS:
            return {
                ...state,
                getBreedStatus: 'success',
                breeds: action?.payload
            };
        case actionTypes.GET_BREEDS.FAILURE:
            return {
                ...state,
                getBreedStatus: 'failure',
            };
        case actionTypes.GET_CATS_BY_BREED.REQUEST:
            return {
                ...state,
                getCatListStatus: 'loading',
            };
        case actionTypes.GET_CATS_BY_BREED.SUCCESS:
            return {
                ...state,
                getCatListStatus: 'success',
                catsByBreed: action?.payload
            };
        case actionTypes.GET_CATS_BY_BREED.FAILURE:
            return {
                ...state,
                getCatListStatus: 'failure',
            };
        case actionTypes.HAS_MORE:
            return {
                ...state,
                showMore: action?.payload,
            };
        default:
            return state;
    }
}

export default reducer;
