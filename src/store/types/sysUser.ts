/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:56
 * @LastEditors: zz
 * @LastEditTime: 2021-07-07 11:55:50
 */
import type { UserSys } from '/@/api/system/model/userModel';

export enum UserSysActionTypes {
  userInfoRequest = 'USER_REQUEST',
  userInfoSuccess = 'USER_SUCCESS',
  UserInfoFailure = 'USER_FAILURE',
}

export { UserSys };

export type UserSysRequestType = {
  type: UserSysActionTypes.userInfoRequest;
  payload: UserSys;
  onSuccess?: () => void;
};

export type ActionTypes = UserSysRequestType;
