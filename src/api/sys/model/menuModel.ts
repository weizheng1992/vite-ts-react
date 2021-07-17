/*
 * @Author: weizheng
 * @Date: 2021-07-17 16:09:33
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 16:57:56
 */

export type MenuParams = { menuName?: string; status?: number };

export interface MenuListItem {
  menuId: string;
  name: string;
  url: string;
  icon: number;
  perms?: string;
  orderNum: number;
  children?: MenuListItem[];
}
