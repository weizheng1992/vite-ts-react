import React, { useState } from 'react';
import { Table, Space } from 'antd';
import { BasicTableProps } from './types/table';
// import TableColumn from './compontent/TableColumn';
// import TableAction from './compontent/TableAction';
import { ColumnProps, ColumnType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

import { isFunction } from '/@/utils/is';

const { Column, ColumnGroup } = Table;

const BasicTable: React.FC<BasicTableProps> = (props) => {
  const { actions, columns, tableProps, sortFn, filterFn } = props;
  const [pagination, setPagination] = useState<false | TablePaginationConfig>(
    tableProps.pagination || false
  );

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Recordable> | SorterResult<Recordable>[]
  ) => {
    setPagination(pagination);
    const params: Recordable = {};
    if (sorter && isFunction(sortFn)) {
      // const sortInfo = sortFn(sorter);
      // searchState.sortInfo = sortInfo;
      // params.sortInfo = sortInfo;
    }

    if (filters && isFunction(filterFn)) {
      // const filterInfo = filterFn(filters);
      // searchState.filterInfo = filterInfo;
      // params.filterInfo = filterInfo;
    }
    fetch(params);
  };
  return (
    <Table {...tableProps} pagination={pagination} onChange={handleChange}>
      {columns?.map((item: ColumnProps<Recordable>, index: number) => {
        if (item.children) {
          const list: ColumnType<Recordable>[] = item.children;
          return (
            <ColumnGroup title={item.title} key={index}>
              {list.map((child, index) => (
                <Column {...child} key={index} />
              ))}
            </ColumnGroup>
          );
        } else {
          return <Column {...item} key={index} />;
        }
      })}
      <Column
        title="Action"
        key="action"
        render={(...params) => (
          <Space size="middle">
            {actions.map((item) => {
              return (
                <a key={item.label} onClick={() => item.onClick && item.onClick(...params)}>
                  Invite {item.label}
                </a>
              );
            })}
          </Space>
        )}
      />
    </Table>
  );
};
export default BasicTable;
