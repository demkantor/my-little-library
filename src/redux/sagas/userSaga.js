import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('LOGIN', loginUser);
    yield takeEvery('LOGOUT', logoutUser);
    yield takeEvery('REGISTER', registerUser);
    yield takeEvery('UPDATE_PROFILE', updateProfile);
};


function* loginUser(user) {
    yield console.log('in user login with:', user.payload);
    try {
        const login = yield axios.post(`/api/users/login`, user.payload);
        yield put({ type: 'SET_USER', payload: login.data });
        
    } catch (error) {
        console.log('Error with user login:', error);
    };
};


function* logoutUser() {
    yield console.log('loggin out');

};

function* registerUser(user) {
    yield console.log('in register user with:', user.payload);
    try {
        const register = yield axios.post(`/api/users/register`, user.payload);
        yield put({ type: 'SET_USER', payload: register.data });
        
    } catch (error) {
        console.log('Error with user registration:', error);
    };
};

function* updateProfile(user) {
    yield console.log('in update profile with:', user.payload);
    try {
        const register = yield axios.put(`/api/users/profile/update/${user.payload.profileId}`, user.payload.send);
        yield put({ type: 'SET_USER', payload: register.data });
        
    } catch (error) {
        console.log('Error with user registration:', error);
    };
};


export default userSaga;
