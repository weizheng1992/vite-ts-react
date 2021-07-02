/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:38
 * @LastEditors: zz
 * @LastEditTime: 2021-06-30 16:43:52
 */
import { put, takeLatest, all } from 'redux-saga/effects';
import { userInfo } from '/@/api/user/system';
import { UserInfoRequest, UserInfoSuccess, UserInfoFailure } from '../../actions/system';
import { UserInfoActionTypes } from '../../types/system';

type CheckUserInfoRequest = ReturnType<typeof UserInfoRequest>;

function* checkUserInfoRequest({ payload, onSuccess }: CheckUserInfoRequest) {
  try {
    const data = yield userInfo(payload);
    yield put(UserInfoSuccess(data));
    localStorage.setItem('token', data.token);
    onSuccess && onSuccess();
  } catch (error) {
    yield put(UserInfoFailure(`${error}`));
  }
}

export default all([takeLatest(UserInfoActionTypes.userInfoRequest, checkUserInfoRequest)]);
