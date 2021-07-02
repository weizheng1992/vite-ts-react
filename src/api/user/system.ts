/*
 * @Author: zz
 * @Date: 2021-06-30 10:50:45
 * @LastEditors: zz
 * @LastEditTime: 2021-06-30 10:54:19
 */
import { defHttp } from '/@/utils/axios';

enum Api {
  UserInfo = '/userinfo',
}

/**
 * @name: zz
 * @desc: 查询用户列表
 * @msg:
 * @param {any} params
 * @return {*}
 */
export const userInfo = (params: any) =>
  defHttp.post<any>({
    url: Api.UserInfo,
    params,
  });
