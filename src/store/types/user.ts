import { Action } from './common';
import type { LoginParams, LoginResultModel, RegisterParams } from '/@/api/user/model/userModel';

export enum UserActionTypes {
  loginRequest = 'LOGIN_REQUEST',
  loginSucces = 'LOGIN_SUCCESS',
  loginFailure = 'LOGIN_FAILURE',
  registerSuccess = 'REGISTER_SUCESS',
  registerRequest = 'REGISTER_REQUEST',
  registerFailure = 'REGISTER_FAILURE',
  logout = 'LOGOUT',
}

export { LoginParams, LoginResultModel, RegisterParams };

export type loginAction = {
  type: UserActionTypes.loginRequest;
  payload: LoginParams;
  onSuccess?: () => void;
};

export type loginRequestAction = Action<UserActionTypes.loginSucces, LoginResultModel>;
export type loginFailureAction = Action<UserActionTypes.loginFailure, string>;

export type registerAction = {
  type: UserActionTypes.registerRequest;
  payload: RegisterParams;
  onSuccess?: () => void;
};

export type registerRequestAction = Action<UserActionTypes.registerSuccess, LoginResultModel>;

export type registerFailureAction = Action<UserActionTypes.registerFailure, string>;

export type logoutAction = {
  type: UserActionTypes.logout;
  onSuccess?: () => void;
};

export type ActionTypes =
  | loginAction
  | registerAction
  | loginRequestAction
  | registerRequestAction
  | loginFailureAction
  | registerFailureAction
  | logoutAction;

export type UserState = {
  userInfo: LoginResultModel;
  error: string;
  user?: LoginResultModel;
};
