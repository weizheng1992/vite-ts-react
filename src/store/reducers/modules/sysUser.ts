/*
 * @Author: zz
 * @Date: 2021-06-30 10:55:20
 * @LastEditors: zz
 * @LastEditTime: 2021-07-13 14:55:34
 */
import { Reducer } from 'redux';
import produce from 'immer';
import { UserSysActionTypes, SysState, Pagination } from '../../types/sysUser';

const initState: SysState = { pagination: {} as Pagination, userInfoList: [] };

const userInfo: Reducer = (state = initState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UserSysActionTypes.userInfoSuccess:
        const { data, total } = action.payload;
        // 用户列表
        const userInfoList: any = data;
        // 用户分页
        const Pagination = {
          current: userInfoList.current || 1,
          pageSize: userInfoList.pageSize || 20,
          total: total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`,
        };
        draft.pagination = Pagination;
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
