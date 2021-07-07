/*
 * @Author: zz
 * @Date: 2021-07-06 19:41:27
 * @LastEditors: zz
 * @LastEditTime: 2021-07-06 20:01:30
 */
import { defHttp } from '/@/utils/axios';
import { UserManage, UserRequestManage } from './model/userModel';

enum Api {
  SysUserList = '/sysUserList',
}

export const userManagTable = (params: UserManage) =>
  defHttp.post<UserRequestManage>({
    url: Api.SysUserList,
    params,
  });
