import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* userSaga() {
    yield takeEvery('LOGIN', loginUser);
    yield takeEvery('LOGOUT', logoutUser);
    yield takeEvery('REGISTER', registerUser);
    yield takeEvery('GET_THIS_USER', getThisUser);
    yield takeEvery('UPDATE_PROFILE', updateProfile);
};

// logs a user in and sets web token auth
function* loginUser(user) {
    yield console.log('in user login with:', user.payload);
    try {
        const login = yield axios.post(`/api/users/login`, user.payload);
        yield setAuthorizationHeader(login.headers.x_access_token, login.headers.x_refresh_token, login.data.data._id);
        yield put({ type: 'SET_TOKEN', payload: login.headers.x_access_token });
        yield put({ type: 'SET_USER', payload: login.data });
        
    } catch (error) {
        console.log('Error with user login:', error);
    };
};

// upon screen refresh check webtoken and id to keep user logged in
function* getThisUser(){
    const id = localStorage.CurrentUser;
    const token = localStorage.AuthToken;
    console.log("We are here in user GET info saga with:", id, token);
    const thisUser = yield axios.get(`/api/users/auth/${id}/${token}`);
    console.log('in saga - this user GET back with:', thisUser.data);
    yield put({ type: 'SET_USER', payload: thisUser.data });
};

// logs user out, removes webtoken auth
function* logoutUser() {
    yield console.log(axios.defaults.headers.common)
    try {
        // yield axios.post('/logout');
        delete axios.defaults.headers.common['Authorization'];
        yield put({ type: 'UNSET_TOKEN' });
        yield put({ type: 'UNSET_USER' });
        localStorage.removeItem('AuthToken');
        localStorage.removeItem('RefreshToken');
        localStorage.removeItem('CurrentUser');
    } catch (error) {
      console.log('Error with user logout:', error);
    };
};

// registers and logins in new user and sts auth web token
function* registerUser(user) {
    yield console.log('in register user with:', user.payload);
    try {
        const register = yield axios.post(`/api/users/register`, user.payload);
        yield setAuthorizationHeader(user.headers.x_access_token, user.headers.x_refresh_token);
        yield put({ type: 'SET_TOKEN', payload: user.headers.x_access_token });
        yield put({ type: 'SET_USER', payload: register.data });
        
    } catch (error) {
        console.log('Error with user registration:', error);
    };
};

// sends update user profile info to database
function* updateProfile(user) {
    yield console.log('in update profile with:', user.payload);
    try {
        if(user.payload.send.image) {
            const config = { headers: {'Content-Type': 'multipart/form-data'} }
            const register = yield axios.put(`/api/users/profile/update/${user.payload.profileId}`, user.payload.send, config);
            yield put({ type: 'SET_USER', payload: register.data });
        } else {
            const register = yield axios.put(`/api/users/profile/update/${user.payload.profileId}`, user.payload.send);
            yield put({ type: 'SET_USER', payload: register.data });
        }
    } catch (error) {
        console.log('Error with user registration:', error);
    };
};

// holds current user's JSON webtoken to be used in api headers
const setAuthorizationHeader = (authToken, refreshToken, id) => {
    const AuthToken = `Bearer ${authToken}`;
    const RefreshToken = `Bearer ${refreshToken}`;
    localStorage.setItem('AuthToken', AuthToken);
    localStorage.setItem('RefreshToken', RefreshToken);
    localStorage.setItem('CurrentUser', id);
    axios.defaults.headers.common['Authorization'] = AuthToken;
};


export default userSaga;
