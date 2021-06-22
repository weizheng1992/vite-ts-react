import { put, takeLatest, all } from 'redux-saga/effects';
import { loginApi } from '/@/api/user/user';
import { LoginActionTypes } from '../../types/login';
import { loginRequest, loginSucces, loginFailure } from '../../actions/login';

type CheckLoginRequest = ReturnType<typeof loginRequest>;

function* checkLoginRequest({ payload }: CheckLoginRequest) {
  const { username, password } = payload;

  try {
    const data = yield loginApi({ username, password });
    yield put(loginSucces(data));
  } catch (error) {
    yield put(loginFailure(`${error}`));
  }
}

export default all([takeLatest(LoginActionTypes.loginRequest, checkLoginRequest)]);
