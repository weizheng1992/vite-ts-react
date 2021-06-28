// import { UserInfo } from './../../../../../vite-react-node/src/sqls/user/model/searchModel';
import { Reducer } from 'redux';
import produce from 'immer';

import { UserState, LoginResultModel, ActionTypes, UserActionTypes } from '../../types/user';

const initState: UserState = {
  userInfo: {} as LoginResultModel,
  error: '',
};

const login: Reducer<UserState> = (state = initState, action: ActionTypes) => {
  console.log('state :>> ', state);
  console.log('action :>> ', action);
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
