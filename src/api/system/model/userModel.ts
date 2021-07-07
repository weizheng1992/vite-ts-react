/*
 * @Author: zz
 * @Date: 2021-07-06 19:41:01
 * @LastEditors: zz
 * @LastEditTime: 2021-07-06 19:53:27
 */

export interface UserManage {
  page?: number;
  size?: number;
}

export interface UserRequestManage {
  username: string;
  nickname: string;
  email: string;
}
