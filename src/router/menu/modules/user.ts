/*
 * @Author: zz
 * @Date: 2021-06-29 17:29:57
 * @LastEditors: zz
 * @LastEditTime: 2021-06-29 17:33:35
 */
import { MenuModule } from '../type';

const index: MenuModule = {
  orderNo: 113,
  menu: {
    path: 'sys',
    name: '系统管理',
    children: [
      { path: 'user', name: '用户管理' },
      { path: 'menu', name: '菜单管理' },
    ],
  },
};
export default index;
