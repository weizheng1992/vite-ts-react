import { Action } from './common';
import type { LoginParams, LoginResultModel, RegisterParams } from '/@/api/user/model/userModel';

export enum LoginActionTypes {
  loginRequest = 'LOGIN_REQUEST',
  registerRequest = 'REGISTER_REQUEST',
  loginSucces = 'LOGIN_SUCCESS',
  registerSuccess = 'REGISTER_SUCESS',
  loginFailure = 'LOGIN_FAILURE',
  logout = 'LOGOUT',
}

export { LoginParams, LoginResultModel, RegisterParams };

export type loginAction = {
  type: LoginActionTypes.loginRequest;
  payload: LoginParams;
  onSuccess?: () => void;
};

export type registerAction = {
  type: LoginActionTypes.registerRequest;
  payload: RegisterParams;
  onSuccess?: () => void;
};

export type loginRequestAction = Action<LoginActionTypes.loginSucces, LoginResultModel>;
export type registerRequestAction = Action<LoginActionTypes.registerSuccess, LoginResultModel>;
export type loginFailureAction = Action<LoginActionTypes.loginFailure, string>;

export type logoutAction = {
  type: LoginActionTypes.logout;
  onSuccess?: () => void;
};

export type ActionTypes =
  | loginAction
  | registerAction
  | loginRequestAction
  | registerRequestAction
  | loginFailureAction
  | logoutAction;

export type LoginState = {
  userInfo: LoginResultModel;
  error: string;
  user?: LoginResultModel;
};
