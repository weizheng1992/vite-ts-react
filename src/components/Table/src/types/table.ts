/*
 * @Author: weizheng
 * @Date: 2021-06-15 20:27:04
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 16:07:23
 */
import React from 'react';
import { TableProps, ColumnsType, ColumnType } from 'antd/es/table';
import { ActionItem } from './tableAction';
import { SorterResult, FilterValue } from 'antd/es/table/interface';
export interface FetchSetting {
  // 请求接口当前页数
  pageField: string;
  // 每页显示多少条
  sizeField: string;
  // 请求结果列表字段  支持 a.b.c
  listField: string;
  // 请求结果总数字段  支持 a.b.c
  totalField: string;
}
export interface BasicTableProps {
  columns: ColumnsType<Recordable>;
  actions: ActionItem[];

  rowKey?: string | ((record: Recordable) => string);
  // 接口请求对象
  api?: (...arg: any) => Promise<any>;
  // 请求之前处理参数
  beforeFetch?: Fn;
  // 自定义处理接口返回参数
  afterFetch?: Fn;
  // 查询条件请求之前处理
  handleSearchInfoFn?: Fn;
  // 请求接口配置
  fetchSetting?: Partial<FetchSetting>;
  // 额外的请求参数
  searchInfo?: Recordable;
  // 表格配置
  tableProps?: TableProps<Recordable>;
  // 自定义排序方法
  sortFn?: (sortInfo: SorterResult<Recordable> | SorterResult<Recordable>[]) => any;
  // 排序方法
  filterFn?: (data: Partial<Record<string, FilterValue | null>>) => any;
  ref?: React.RefObject<any>;
  actionProps?: ColumnType<Recordable>;
}
export interface FetchParams {
  searchInfo?: Recordable;
  page?: number;
  sortInfo?: Recordable;
  filterInfo?: Recordable;
}
export interface TableRef {
  handleSearchFunc: (params: Recordable) => void;
}
