/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:20
 * @LastEditors: zz
 * @LastEditTime: 2021-07-07 11:56:28
 */
import { Reducer } from 'redux';
import produce from 'immer';
import { UserSysActionTypes } from '../../types/sysUser';

const initState: any = {};

const userInfo: Reducer = (state = initState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UserSysActionTypes.userInfoSuccess:
        const userInfoList: any = action.payload;
        draft.userInfoList = userInfoList;
        break;
      case UserSysActionTypes.UserInfoFailure:
        break;
      default: {
        return draft;
      }
    }
  });
};

export default userInfo;
