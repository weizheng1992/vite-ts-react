/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:56
 * @LastEditors: zz
 * @LastEditTime: 2021-06-30 17:38:53
 */
// import { Action } from './common';
import type { UserSelect } from '/@/api/user/model/system';

export enum UserInfoActionTypes {
  userInfoRequest = 'USER_REQUEST',
  userInfoSuccess = 'USER_SUCCESS',
  UserInfoFailure = 'USER_FAILURE',
}

export { UserSelect };

export type UserInfoRequestType = {
  type: UserInfoActionTypes.userInfoRequest;
  payload: UserSelect;
  onSuccess?: () => void;
};

export type ActionTypes = UserInfoRequestType;
