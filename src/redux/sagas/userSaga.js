import axios from 'axios'
import { takeEvery, takeLatest, put } from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('LOGIN', loginUser);
    yield takeEvery('LOGOUT', logoutUser);

};


function* loginUser(user) {
    yield console.log('in user login with ', user);

};


function* logoutUser() {
    yield console.log('loggin out')

};


export default userSaga;
