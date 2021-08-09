/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 19:38:01
 */
import { Reducer } from 'redux';
import produce from 'immer';
import { UserSysActionTypes, SysState, Pagination } from '../../types/sysUser';

const initState: SysState = { pagination: {} as Pagination, userInfoList: [] };

const userInfo: Reducer = (state = initState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UserSysActionTypes.userInfoSuccess:
        const { data, total, current, pageSize } = action.payload;
        // 用户列表
        const userInfoList: any = data;
        // 用户分页
        const Pagination = {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`,
        };
        draft.pagination = Pagination;
        draft.userInfoList = userInfoList;
        break;
      case UserSysActionTypes.userInfoDelete:
        console.log('action.payload 88888888:>> ', action.payload);
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
