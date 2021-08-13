/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-13 19:10:01
 */
import type { UserSys, UserId } from '/@/api/system/model/userModel';

export enum UserSysActionTypes {
  userInfoRequest = 'USER_REQUEST',
  userInfoDelete = 'USER_DELETE',
  userInfoSuccess = 'USER_SUCCESS',
  UserInfoFailure = 'USER_FAILURE',
}

export { UserSys, UserId };

export type UserSysRequestType = {
  type: UserSysActionTypes.userInfoRequest;
  payload: UserSys;
  onSuccess?: () => void;
};

export type UserSysDeleteType = {
  type: UserSysActionTypes.userInfoDelete;
  payload: UserId;
  onSuccess?: () => void;
};

export type Pagination = {
  pagination: number;
  current: number;
  total: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  showTotal?: (total: number) => number;
};

export type SysState = {
  pagination: Pagination;
  userInfoList: [];
};

export type ActionTypes = UserSysRequestType;
