/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:38
 * @LastEditors: zz
 * @LastEditTime: 2021-07-13 14:40:12
 */
import { put, takeLatest, all } from 'redux-saga/effects';
import { userSysList } from '/@/api/system/user';
import { UserSysRequest, UserSysSuccess, UserSysFailure } from '../../actions/sysUser';
import { UserSysActionTypes } from '../../types/sysUser';

type CheckUserInfoRequest = ReturnType<typeof UserSysRequest>;

function* checkUserInfoRequest({ payload, onSuccess }: CheckUserInfoRequest) {
  try {
    const data = yield userSysList(payload);
    console.log('data :>> ', data);
    yield put(UserSysSuccess(data));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(UserSysFailure(`${error}`));
  }
}

export default all([takeLatest(UserSysActionTypes.userInfoRequest, checkUserInfoRequest)]);