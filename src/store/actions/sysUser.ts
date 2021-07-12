/*
 * @Author: zz
 * @Date: 2021-07-02 18:13:58
 * @LastEditors: zz
 * @LastEditTime: 2021-07-08 15:46:51
 */
import { UserSysActionTypes, UserSys, UserSysRequestType } from '../types/sysUser';

export const UserSysRequest = (payload: UserSys, callback: () => void): UserSysRequestType => ({
  type: UserSysActionTypes.userInfoRequest,
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
