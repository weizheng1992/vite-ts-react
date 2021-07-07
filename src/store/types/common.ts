/*
 * @Author: zz
 * @Date: 2021-06-28 17:22:48
 * @LastEditors: zz
 * @LastEditTime: 2021-07-06 20:12:16
 */
export interface Action<T extends string, P> {
  type: T;
  payload: P;
}
