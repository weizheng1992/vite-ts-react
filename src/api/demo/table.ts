/*
 * @Author: weizheng
 * @Date: 2021-06-29 17:22:07
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-02 10:47:24
 */
import { defHttp } from '/@/utils/axios';
import { DemoListGetResultModel, DemoParams } from './model/tableModel';
enum Api {
  DEMO_LIST = '/userList',
}

export const demoListApi = (params: DemoParams) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
