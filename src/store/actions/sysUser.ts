/*
 * @Author: zz
 * @Date: 2021-07-02 18:13:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 20:03:52
 */
import {
  UserSysActionTypes,
  UserSys,
  UserId,
  UserSysRequestType,
  UserSysDeleteType,
} from '../types/sysUser';

export const UserSysRequest = (payload: UserSys, callback: () => void): UserSysRequestType => ({
  type: UserSysActionTypes.userInfoRequest,
  payload,
  onSuccess: callback || null,
});

export const UserSysDel = (payload: UserId, callback: () => void): UserSysDeleteType => ({
  type: UserSysActionTypes.userInfoDelete,
  payload,
  onSuccess: callback || null,
});

export const UserSysSuccess = (payload: any) => ({
  type: UserSysActionTypes.userInfoSuccess,
  payload,
});

export const UserSysFailure = (payload: any) => ({
  type: UserSysActionTypes.UserInfoFailure,
  payload,
});
