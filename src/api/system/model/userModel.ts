/*
 * @Author: zz
 * @Date: 2021-07-06 19:41:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 19:32:18
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

export interface UserId {
  id?: number;
}
