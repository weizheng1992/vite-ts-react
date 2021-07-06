/*
 * @Author: weizheng
 * @Date: 2021-07-01 16:56:38
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-01 16:56:50
 */
export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T extends any> {
  items: T[];
  total: number;
}
