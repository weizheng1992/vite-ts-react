import {
  LoginParams,
  RegisterParams,
  LoginResultModel,
  loginAction,
  registerAction,
  LoginActionTypes,
  loginFailureAction,
  loginRequestAction,
  registerRequestAction,
  logoutAction,
} from '../types/login';

export const loginRequest = (payload: LoginParams, callback: () => void): loginAction => ({
  type: LoginActionTypes.loginRequest,
  payload,
  onSuccess: callback || null,
});
export const registerRequest = (payload: RegisterParams, callback: () => void): registerAction => ({
  type: LoginActionTypes.registerRequest,
  payload,
  onSuccess: callback || null,
});
export const loginSucces = (payload: LoginResultModel): loginRequestAction => ({
  type: LoginActionTypes.loginSucces,
  payload,
});
export const registerSuccess = (payload: LoginResultModel): registerRequestAction => ({
  type: LoginActionTypes.registerSuccess,
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
