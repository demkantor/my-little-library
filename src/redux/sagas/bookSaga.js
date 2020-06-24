import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('GET_ALL_BOOKS', getAllBooks);
    yield takeEvery('ADD_BOOK', addBook);
};


// fetchs all books from database
function* getAllBooks() {
    yield console.log('in Get all books saga');
    try {
        const fetchBooks = yield axios.get(`/api/books/all`);
        yield put({ type: 'SET_ALL_BOOKS', payload: fetchBooks.data.data });
        
    } catch (error) {
        console.log('Error with GET all books saga:', error);
    };
};

// adds a new book to database
function* addBook(book) {
    yield console.log('in POST new book saga with', book.payload);
    try {
        yield axios.post(`/api/books`, book.payload);
    } catch (error) {
        console.error('Error with POST new book saga:', error);
    };
};

export default userSaga;
