import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('LOGIN', loginUser);
    yield takeEvery('LOGOUT', logoutUser);

};


function* loginUser(user) {
    yield console.log('in user login with ', user.payload);
    try {
        const login = yield axios.post(`/api/users/login`, user.payload);
        yield put({ type: 'SET_USER', payload: login.data });
        
    } catch (error) {
        console.log('Error with user login:', error);
    };
};


function* logoutUser() {
    yield console.log('loggin out')

};


export default userSaga;
