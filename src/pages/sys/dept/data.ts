import { FormSchema } from '/@/components/Form';
import { ColumnsType } from 'antd/es/table';
const schemas: FormSchema[] = [
  {
    field: 'orderNum',
    label: '部门名称',
    component: 'Input',
  },
  {
    field: 'icon',
    label: '状态',
    component: 'Input',
  },
];
const columns: ColumnsType<Recordable> = [
  {
    title: '部门名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'icon',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'icon',
    width: 100,
  },
];

export { schemas, columns };
