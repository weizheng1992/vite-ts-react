import {
  LoginParams,
  LoginResultModel,
  loginAction,
  LoginActionTypes,
  loginFailureAction,
  loginRequestAction,
  logoutAction,
} from '../types/login';

export const loginRequest = (payload: LoginParams, callback: () => void): loginAction => ({
  type: LoginActionTypes.loginRequest,
  payload,
  onSuccess: callback || null,
});
export const loginSucces = (payload: LoginResultModel): loginRequestAction => ({
  type: LoginActionTypes.loginSucces,
  payload,
});
export const loginFailure = (payload: string): loginFailureAction => ({
  type: LoginActionTypes.loginFailure,
  payload,
});
export const logOut = (callback: () => void): logoutAction => ({
  type: LoginActionTypes.logout,
  onSuccess: callback || null,
});
