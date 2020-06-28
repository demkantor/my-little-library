import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery("GET_ALL_BOOKS", getAllBooks);
    yield takeEvery("ADD_BOOK", addBook);
    yield takeEvery('REMOVE_BOOK', removeBook);
};

// fetchs all books from database
function* getAllBooks() {
    yield console.log("in Get all books saga");
    try {
        const fetchBooks = yield axios.get(`/api/books/all`);

        yield put({ type: "SET_ALL_BOOKS", payload: fetchBooks.data.data });
    } catch (error) {
        console.log("Error with GET all books saga:", error);
    };
};

// adds a new book to database
function* addBook(book) {
  yield console.log("in POST new book saga with", book.payload);
    try {
        if(book.payload.send.image) {
            console.log('here up');
            const config = { headers: {'Content-Type': 'multipart/form-data'} }
            yield axios.post(`/api/books`, book.payload.send, config);
        } else {
            console.log('here down');
            yield axios.post(`/api/books`, book.payload.send);
        }
        yield book.payload.history.push('/books');
    } catch (error) {
        console.error("Error with POST new book saga:", error);
    };
};

// remove book from database
function* removeBook(remove) {
    console.log("in saga DELETE book with: ", remove.payload);
    try {
        yield axios.delete(`/api/books/remove/${remove.payload}`);
        yield put({ type: 'GET_ALL_BOOKS' })
    } catch(error){
        console.error("Error with DELETE book saga:", error);
    };
};

export default userSaga;
