/*
 * @Author: zz
 * @Date: 2021-06-28 17:30:04
 * @LastEditors: zz
 * @LastEditTime: 2021-06-30 16:50:40
 */
// import { UserInfo } from './../../../../../vite-react-node/src/sqls/user/model/searchModel';
import { Reducer } from 'redux';
import produce from 'immer';

import { UserState, LoginResultModel, ActionTypes, UserActionTypes } from '../../types/user';

const initState: UserState = {
  userInfo: {} as LoginResultModel,
  error: '',
};

const login: Reducer<UserState> = (state = initState, action: ActionTypes) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UserActionTypes.loginSucces:
        const userInfo: LoginResultModel = action.payload;
        draft.userInfo = userInfo;
        break;
      case UserActionTypes.loginFailure:
        draft.error = 'error';
        break;
      case UserActionTypes.logout:
        draft.userInfo = {} as LoginResultModel;
        break;
      case UserActionTypes.registerSuccess:
        const user: LoginResultModel = action.payload;
        draft.user = user;
        break;
      case UserActionTypes.registerFailure:
        draft.error = 'error';
        break;
      default: {
        return draft;
      }
    }
  });
};

export default login;
