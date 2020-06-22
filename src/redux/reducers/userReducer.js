import { combineReducers } from 'redux';


const initialState = {
    authenticated: false,
    credentials: {}
};


// stores logged in user
const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { authenticated: true, ...action.payload };
        case 'SET_AUTHENTICATED':
            return { ...state, authenticated: true };
        case 'UNSET_USER':
            return initialState;
        default:
            return state;
    };
};

export default combineReducers({
    currentUser,

});
