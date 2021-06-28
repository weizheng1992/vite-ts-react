import { put, takeLatest, all } from 'redux-saga/effects';
import { loginApi, registerApi } from '/@/api/user/user';
import { UserActionTypes } from '../../types/user';
import {
  loginRequest,
  registerRequest,
  loginSucces,
  loginFailure,
  logOut,
} from '../../actions/user';

type CheckLoginRequest = ReturnType<typeof loginRequest>;
type ChecklogOut = ReturnType<typeof logOut>;
type CheckRegisterRequest = ReturnType<typeof registerRequest>;

function* checkLoginRequest({ payload, onSuccess }: CheckLoginRequest) {
  const { username, password } = payload;
  try {
    const data = yield loginApi({ username, password });
    yield put(loginSucces(data));
    localStorage.setItem('token', data.token);
    onSuccess && onSuccess();
  } catch (error) {
    yield put(loginFailure(`${error}`));
  }
}

function* checkRegisterRequest({ payload, onSuccess }: CheckRegisterRequest) {
  const { username, password } = payload;
  try {
    const data = yield registerApi({ username, password });
    yield put(loginSucces(data));
    localStorage.setItem('token', data.token);
    onSuccess && onSuccess();
  } catch (error) {
    yield put(loginFailure(`${error}`));
  }
}

function* checkLogout({ onSuccess }: ChecklogOut) {
  localStorage.removeItem('token');
  onSuccess && onSuccess();
}

export default all([
  takeLatest(UserActionTypes.loginRequest, checkLoginRequest),
  takeLatest(UserActionTypes.registerRequest, checkRegisterRequest),
  takeLatest(UserActionTypes.logout, checkLogout),
]);
