/*
 * @Author: zz
 * @Date: 2021-07-06 19:41:27
 * @LastEditors: zz
 * @LastEditTime: 2021-07-07 11:54:06
 */
import { defHttp } from '/@/utils/axios';
import { UserSys, UserSysRequest } from './model/userModel';

enum Api {
  SysUserList = '/sysUserList',
}

export const userSysList = (params: UserSys) =>
  defHttp.post<UserSysRequest>({
    url: Api.SysUserList,
    params,
  });
