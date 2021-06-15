import { TableProps, ColumnsType } from 'antd/es/table';
import { ActionItem } from './tableAction';
import { SorterResult } from 'antd/es/table/interface';

export interface BasicTableProps {
  columns: ColumnsType<Recordable>;
  actions: ActionItem[];
  // 接口请求对象
  api?: (...arg: any) => Promise<any>;
  tableProps: TableProps<Recordable>;
  // 自定义排序方法
  sortFn?: (sortInfo: SorterResult) => any;
  // 排序方法
  filterFn?: (data: Partial<Recordable<string[]>>) => any;
}
