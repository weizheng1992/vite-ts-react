/*
 * @Author: weizheng
 * @Date: 2021-07-17 17:01:27
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 17:02:34
 */
import { MenuModule } from '../type';
const index: MenuModule = {
  orderNo: 130,
  menu: {
    path: 'sys',
    name: '系统管理',
    children: [
      { path: 'user', name: '账户管理' },
      { path: 'dept', name: '部门管理' },
      { path: 'menu', name: '菜单管理' },
    ],
  },
};
export default index;
