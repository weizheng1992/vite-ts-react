/*
 * @Author: zz
 * @Date: 2021-07-06 19:41:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-13 17:13:20
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

export interface UserLists {
  create_time: string;
  dept_id: number;
  email: string;
  mobile: string;
  password: string;
  salt: string;
  status: number;
  user_id: number;
  username: string;
}
