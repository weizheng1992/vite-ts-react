/*
 * @Author: zz
 * @Date: 2021-07-06 19:41:01
 * @LastEditors: zz
 * @LastEditTime: 2021-07-07 11:52:20
 */

export interface UserSys {
  page?: number;
  size?: number;
}

export interface UserSysRequest {
  username: string;
  nickname: string;
  email: string;
}
