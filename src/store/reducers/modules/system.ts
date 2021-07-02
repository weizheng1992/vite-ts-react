/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:20
 * @LastEditors: zz
 * @LastEditTime: 2021-06-30 17:40:50
 */
import { Reducer } from 'redux';
import produce from 'immer';
import { UserInfoActionTypes } from '../../types/system';

const initState: any = {};

const userInfo: Reducer = (state = initState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UserInfoActionTypes.userInfoSuccess:
        console.log('action.type :>> ', action.type);
        break;
      case UserInfoActionTypes.UserInfoFailure:
        break;
      default: {
        return draft;
      }
    }
  });
};

export default userInfo;
