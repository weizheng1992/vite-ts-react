import { MenuModule } from '../type';

const index: MenuModule = {
  orderNo: 112,
  menu: {
    path: 'about',
    name: '关于我的',
    children: [
      { path: 'index', name: '我的' },
      { path: 'home', name: 'shsss' },
      { path: 'table', name: '表格' },
    ],
  },
};
export default index;
