import { TableProps, ColumnsType } from 'antd/es/table';
import { ActionItem } from './tableAction';

export interface BasicTableProps {
  columns: ColumnsType<Recordable>;
  actions: ActionItem[];
  // 接口请求对象
  api?: (...arg: any) => Promise<any>;
  tableProps: TableProps<Recordable>;
}
