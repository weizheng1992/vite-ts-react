/*
 * @Descripttion:
 * @version:
 * @Author: weizheng
 * @Date: 2021-06-28 16:26:00
 * @LastEditors: weizheng
 * @LastEditTime: 2021-06-28 17:04:24
 */
import {
  LoginParams,
  RegisterParams,
  LoginResultModel,
  loginAction,
  registerAction,
  UserActionTypes,
  loginFailureAction,
  loginRequestAction,
  registerRequestAction,
  logoutAction,
  registerFailureAction,
} from '../types/user';

/**
 * @name: weizheng
 * @desc: 登录
 * @param {LoginParams} payload
 * @param {function} callback
 * @return {*}
 */
export const loginRequest = (payload: LoginParams, callback: () => void): loginAction => ({
  type: UserActionTypes.loginRequest,
  payload,
  onSuccess: callback || null,
});

export const loginSucces = (payload: LoginResultModel): loginRequestAction => ({
  type: UserActionTypes.loginSucces,
  payload,
});

export const loginFailure = (payload: string): loginFailureAction => ({
  type: UserActionTypes.loginFailure,
  payload,
});

// 注册
export const registerRequest = (payload: RegisterParams, callback: () => void): registerAction => ({
  type: UserActionTypes.registerRequest,
  payload,
  onSuccess: callback || null,
});

export const registerSuccess = (payload: LoginResultModel): registerRequestAction => ({
  type: UserActionTypes.registerSuccess,
  payload,
});
export const registerFailure = (payload: string): registerFailureAction => ({
  type: UserActionTypes.registerFailure,
  payload,
});

// 退出
export const logOut = (callback: () => void): logoutAction => ({
  type: UserActionTypes.logout,
  onSuccess: callback || null,
});
