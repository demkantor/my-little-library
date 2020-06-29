import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery("GET_ALL_BOOKS", getAllBooks);
    yield takeEvery("ADD_BOOK", addBook);
    yield takeEvery('REMOVE_BOOK', removeBook);
    yield takeEvery('REMOVE_MANY_BOOKS', removeManyBooks);
    yield takeEvery('SEARCH_BOOKS', searchBooks);
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
        yield axios.delete(`/api/books/remove/one/${remove.payload}`);
        yield put({ type: 'GET_ALL_BOOKS' })
    } catch(error){
        console.error("Error with DELETE book saga:", error);
    };
};

// remove multiple books from database
function* removeManyBooks(remove) {
    console.log("in saga DELETE multiple books with: ", remove.payload);
    try {
        yield axios.delete(`/api/books/remove/many`, { data: remove.payload });
        yield put({ type: 'GET_ALL_BOOKS' })
    } catch(error){
        console.error("Error with DELETE multiple books saga:", error);
    };
};

// GETS book(s) from database by search criteria
function* searchBooks(criteria) {
    yield console.log("in GET book(s) by criteria saga:", criteria.payload);
    try {
        const fetchBooks = yield axios.post(`/api/books/search`, criteria.payload);

        yield put({ type: "SET_THESE_BOOKS", payload: fetchBooks.data.data });
    } catch (error) {
        console.log("Error with GET all books saga:", error);
    };
};

export default userSaga;
