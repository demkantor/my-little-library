import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import bookSaga from './bookSaga';



export default function* rootSaga() {
    yield all([
        userSaga(),
        bookSaga()
    ]);
};
