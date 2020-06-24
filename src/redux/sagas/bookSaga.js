import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('GET_ALL_BOOKS', getAllBooks);

};


function* getAllBooks() {
    yield console.log('in Get all books saga with ');
    try {
        const fetchBooks = yield axios.get(`/api/books/all`);
        yield put({ type: 'SET_ALL_BOOKS', payload: fetchBooks.data.data });
        
    } catch (error) {
        console.log('Error with GET all books saga:', error);
    };
};


export default userSaga;
