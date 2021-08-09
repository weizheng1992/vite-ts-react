/*
 * @Author: zz
 * @Date: 2021-07-06 19:41:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 16:17:36
 */
import { defHttp } from '/@/utils/axios';
import { UserSys, UserSysRequest, UserId } from './model/userModel';

enum Api {
  SysUserList = '/sysUserList',
  SysUserDel = '/sysUserDel',
}

// 用户列表
export const userSysList = (params: UserSys) =>
  defHttp.post<UserSysRequest>({
    url: Api.SysUserList,
    params,
  });

// 用户列表的删除
export const userSysDel = (id: UserId) =>
  defHttp.post<UserSysRequest>({
    url: Api.SysUserDel,
    id,
  });
