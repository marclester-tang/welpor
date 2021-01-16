import * as actionTypes from "./balance.action-types";

const initialState = {
    status: "pending",
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_BALANCE.REQUEST:
            return {
                ...state,
                status: 'loading',
            };
        case actionTypes.GET_BALANCE.SUCCESS:
            return {
                ...state,
                ...(action.payload.data.length > 0
                    ? action.payload.data[0]
                    : { newBalance: "0.00" }),
                status: 'success',
            };
        case actionTypes.GET_BALANCE.FAILURE:
            return {
                ...state,
                status: 'failure',
            };
        default:
            return state;
    }
}
