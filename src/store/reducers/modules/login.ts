import { Reducer } from 'redux';
import produce from 'immer';

import { LoginState, LoginResultModel, ActionTypes, LoginActionTypes } from '../../types/login';

const initState: LoginState = {
  userInfo: {} as LoginResultModel,
  error: '',
};

const login: Reducer<LoginState> = (state = initState, action: ActionTypes) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LoginActionTypes.loginSucces:
        console.log(action);
        const userInfo: LoginResultModel = action.payload;
        draft.userInfo = userInfo;
        break;
      case LoginActionTypes.loginFailure:
        draft.error = 'error';
        break;
      default: {
        return draft;
      }
    }
  });
};

export default login;
