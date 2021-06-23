import { put, takeLatest, all } from 'redux-saga/effects';
import { loginApi } from '/@/api/user/user';
import { LoginActionTypes } from '../../types/login';
import { loginRequest, loginSucces, loginFailure, logOut } from '../../actions/login';

type CheckLoginRequest = ReturnType<typeof loginRequest>;
type ChecklogOut = ReturnType<typeof logOut>;

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

function* checkLogout({ onSuccess }: ChecklogOut) {
  localStorage.removeItem('token');
  onSuccess && onSuccess();
}

export default all([
  takeLatest(LoginActionTypes.loginRequest, checkLoginRequest),
  takeLatest(LoginActionTypes.logout, checkLogout),
]);
