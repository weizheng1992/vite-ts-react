/*
 * @Author: weizheng
 * @Date: 2021-07-17 16:08:31
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 16:52:26
 */
import { defHttp } from '/@/utils/axios';
import { MenuListItem, MenuUpdateResultModel } from './model/menuModel';

const getMenu = `query{
  getMenus{
    id
    parentId
    name
    path
    url
    perms
    type
    icon
    sort
  }
}`;

const updateMenu = ({
  id,
  parentId,
  name,
  path,
  url,
  perms,
  type,
  icon,
  sort,
}: MenuListItem) => `mutation{
  updateMenu(id: ${id}, parentId: ${parentId}, name: "${name}", path: ${path}, url: "${url}", perms: "${perms}", type: ${type}, icon: "${icon}, sort: ${sort}){
    success
    message
  }
}`;

// 菜单列表
export const menuListApi = () =>
  defHttp.post<MenuListItem[]>(
    {
      url: '',
      params: { query: getMenu },
      headers: {
        ignoreCancelToken: true,
      },
    },
    {
      gqlKey: 'getMenus',
    }
  );

// 更新菜单
export const menuUpdateApi = (params: MenuListItem) => {
  defHttp.post<MenuUpdateResultModel>(
    {
      url: '',
      // url: Api.MENU_UPDATE,
      params: { query: updateMenu(params) },
      headers: {
        ignoreCancelToken: true,
      },
    },
    {
      gqlKey: 'updateMenu',
    }
  );
};
