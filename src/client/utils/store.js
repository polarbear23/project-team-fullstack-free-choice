import { createContext } from 'react';

import { STORE_ACTIONS } from '../config';

export const StoreContext = createContext();

export const initialState = {
    competitions: [],
    user: '',
};

export const reducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.COMPETITIONS:
            return {
                ...state,
                competitions: action.payload,
            };
        case STORE_ACTIONS.USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};