/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:56
 * @LastEditors: zz
 * @LastEditTime: 2021-07-12 19:57:58
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

export type Pagination = {
  pagination: number;
  current: number;
  total: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  showTotal?: (total: number) => void;
};

export type SysState = {
  pagination: Pagination;
  userInfoList: [];
};

export type ActionTypes = UserSysRequestType;
