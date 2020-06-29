import { combineReducers } from 'redux';


// stores full selection of books
const allBooks = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_BOOKS':
            return state = action.payload;
        default:
            return state;
    };
};

// stores list of books by search criteria
const theseBooks = (state = [], action) => {
    switch (action.type) {
        case 'SET_THESE_BOOKS':
            return state = action.payload;
        default:
            return state;
    };
};

// stores a single book requested to edit/view
const thisBook = (state = {}, action) => {
    switch (action.type) {
        case 'SET_THIS_BOOK':
            return state = action.payload;
        default:
            return state;
    };
};

export default combineReducers({
    allBooks,
    theseBooks,
    thisBook
});