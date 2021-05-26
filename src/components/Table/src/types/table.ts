import { TableProps } from 'antd/es/table';
import { ActionItem } from './tableAction';

export interface BasicTableProps {
  actions: ActionItem[];
  // 接口请求对象
  api?: (...arg: any) => Promise<any>;
  tableProps: TableProps<Recordable>;
}
