/*
 * @Author: weizheng
 * @Date: 2021-07-17 16:08:31
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 16:52:26
 */
import { defHttp } from '/@/utils/axios';
import { MenuListItem, MenuParams } from './model/menuModel';
enum Api {
  MENU_LIST = '/menu/list',
}

export const menuListApi = (params: MenuParams) =>
  defHttp.post<MenuListItem[]>({
    url: Api.MENU_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
