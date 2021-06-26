// import { UserInfo } from './../../../../../vite-react-node/src/sqls/user/model/searchModel';
import { Reducer } from 'redux';
import produce from 'immer';

import { LoginState, LoginResultModel, ActionTypes, LoginActionTypes } from '../../types/login';

const initState: LoginState = {
  userInfo: {} as LoginResultModel,
  error: '',
};

const login: Reducer<LoginState> = (state = initState, action: ActionTypes) => {
  console.log('state :>> ', state);
  console.log('action :>> ', action);
  return produce(state, (draft) => {
    switch (action.type) {
      case LoginActionTypes.loginSucces:
        // const userInfo: LoginResultModel = action.payload;
        // draft.userInfo = userInfo;
        break;
      case LoginActionTypes.loginFailure:
        draft.error = 'error';
        break;
      case LoginActionTypes.logout:
        draft.userInfo = {} as LoginResultModel;
        break;
      case LoginActionTypes.registerSuccess:
        const user: LoginResultModel = action.payload;
        draft.user = user;
        break;
      default: {
        return draft;
      }
    }
  });
};

export default login;
