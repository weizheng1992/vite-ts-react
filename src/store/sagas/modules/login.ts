import { put, takeLatest, all } from 'redux-saga/effects';
import { loginApi } from '/@/api/user/user';
import { LoginActionTypes } from '../../types/login';
import { loginRequest } from '../../actions/login';

type CheckLoginRequest = ReturnType<typeof loginRequest>;

function* checkLoginRequest({ payload }: CheckLoginRequest) {
  console.log(';2222222222222');
  const { username, password } = payload;

  try {
    const { data } = yield loginApi({ username, password });
    yield put({ type: LoginActionTypes.loginSucces, data });
  } catch (error) {
    yield put({ type: LoginActionTypes.loginFailure, error });
  }
}

export default all([takeLatest(LoginActionTypes.loginRequest, checkLoginRequest)]);
