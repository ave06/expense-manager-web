import { LOG_IN, LOG_OUT } from "./actions";

export const userReducer = (state = { user: undefined }, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                user: action.user
            };
        case LOG_OUT:
            return {
                ...state,
                user: undefined
            };
        default:
            return state;
    }
};


