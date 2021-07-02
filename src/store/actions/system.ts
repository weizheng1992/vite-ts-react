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
