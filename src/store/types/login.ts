import { Action } from './common';
import type { LoginParams, LoginResultModel } from '/@/api/user/model/userModel';

export enum LoginActionTypes {
  loginRequest = 'LOGIN_REQUEST',
  loginSucces = 'LOGIN_SUCCESS',
  loginFailure = 'LOGIN_FAILURE',
}

export { LoginParams, LoginResultModel };

export type loginAction = Action<LoginActionTypes.loginRequest, LoginParams>;
export type loginRequestAction = Action<LoginActionTypes.loginSucces, LoginResultModel>;
export type loginFailureAction = Action<LoginActionTypes.loginFailure, string>;

export type ActionTypes = loginAction | loginRequestAction | loginFailureAction;
export type LoginState = {
  userInfo: LoginResultModel;
  error: string;
};
