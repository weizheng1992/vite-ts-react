import { Action } from './common';
import type { LoginParams, LoginResultModel } from '/@/api/user/model/userModel';

export enum LoginActionTypes {
  loginRequest = 'LOGIN_REQUEST',
  loginSucces = 'LOGIN_SUCCESS',
  loginFailure = 'LOGIN_FAILURE',
  logout = 'LOGOUT',
}

export { LoginParams, LoginResultModel };

export type loginAction = {
  type: LoginActionTypes.loginRequest;
  payload: LoginParams;
  onSuccess?: () => void;
};
export type loginRequestAction = Action<LoginActionTypes.loginSucces, LoginResultModel>;
export type loginFailureAction = Action<LoginActionTypes.loginFailure, string>;

export type logoutAction = {
  type: LoginActionTypes.logout;
  onSuccess?: () => void;
};

export type ActionTypes = loginAction | loginRequestAction | loginFailureAction | logoutAction;

export type LoginState = {
  userInfo: LoginResultModel;
  error: string;
};
