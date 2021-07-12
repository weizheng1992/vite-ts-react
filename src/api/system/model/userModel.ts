/*
 * @Author: zz
 * @Date: 2021-07-06 19:41:01
 * @LastEditors: zz
 * @LastEditTime: 2021-07-08 15:47:09
 */

export interface UserSys {
  page?: number;
  size?: number;
  names?: string;
}

export interface UserSysRequest {
  username: string;
  nickname: string;
  email: string;
}
