import { MenuModule } from '../type';

const index: MenuModule = {
  orderNo: 112,
  menu: {
    path: 'comp',
    name: 'demo',
    children: [
      { path: 'form', name: '表单' },
      { path: 'table', name: '表格' },
    ],
  },
};
export default index;
