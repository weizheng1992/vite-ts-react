/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 11:30:20
 */
import { put, takeLatest, all } from 'redux-saga/effects';
import { userSysList } from '/@/api/system/user';
import { UserSysRequest, UserSysSuccess, UserSysFailure } from '../../actions/sysUser';
import { UserSysActionTypes } from '../../types/sysUser';

type CheckUserInfoRequest = ReturnType<typeof UserSysRequest>;

function* checkUserInfoRequest({ payload, onSuccess }: CheckUserInfoRequest) {
  try {
    console.log('payload :>> ', payload);
    const data = yield userSysList(payload);
    console.log('data :>> ', data);
    yield put(UserSysSuccess(data));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(UserSysFailure(`${error}`));
  }
}

export default all([takeLatest(UserSysActionTypes.userInfoRequest, checkUserInfoRequest)]);
