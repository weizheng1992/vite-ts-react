/*
 * @Author: weizheng
 * @Date: 2021-07-17 17:01:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-28 16:23:49
 */
import { MenuModule } from '../type';
const index: MenuModule = {
  orderNo: 130,
  menu: {
    path: 'sys1',
    name: '系统管理1',
    children: [{ path: 'menu', name: '菜单管理' }],
  },
};
export default index;
