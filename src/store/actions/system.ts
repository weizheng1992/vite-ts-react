/*
 * @Author: zz
 * @Date: 2021-07-02 18:13:58
 * @LastEditors: zz
 * @LastEditTime: 2021-07-06 17:08:41
 */
import { UserInfoActionTypes, UserSelect, UserInfoRequestType } from '../types/system';

export const UserInfoRequest = (
  payload: UserSelect,
  callback: () => void
): UserInfoRequestType => ({
  type: UserInfoActionTypes.userInfoRequest,
  payload,
  onSuccess: callback || null,
});

export const UserInfoSuccess = (payload: any) => ({
  type: UserInfoActionTypes.userInfoSuccess,
  payload,
});

export const UserInfoFailure = (payload: any) => ({
  type: UserInfoActionTypes.UserInfoFailure,
  payload,
});
