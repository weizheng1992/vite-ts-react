/*
 * @Author: weizheng
 * @Date: 2021-06-22 20:30:54
 * @LastEditors: weizheng
 * @LastEditTime: 2021-06-29 17:09:57
 */
import React, { useState } from 'react';
import { Table, Space } from 'antd';
import { BasicTableProps, ActionItem } from './types/table';
// import TableColumn from './compontent/TableColumn';
// import TableAction from './compontent/TableAction';
import { ColumnProps, ColumnType, TablePaginationConfig } from 'antd/es/table';
import { SpinProps } from 'antd/es/spin';

import { useImmer } from 'use-immer';

import { useDataSource } from './hooks/useDataSource';

const { Column, ColumnGroup } = Table;

const BasicTable: React.FC<BasicTableProps> = (props) => {
  const { actions, columns, tableProps } = props;
  const [loading, setLoading] = useState<boolean | SpinProps | undefined>(props.tableProps.loading);
  const [pagination, setPagination] = useImmer<false | TablePaginationConfig>(
    tableProps.pagination || false
  );

  const { handleTableChange, dataSource } = useDataSource(props, {
    paginationInfo: pagination,
    setPagination,
    setLoading,
  });

  return (
    <Table
      {...tableProps}
      pagination={pagination}
      onChange={handleTableChange}
      loading={loading}
      dataSource={dataSource}
    >
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
            {actions.map((item: ActionItem) => (
              <a key={item.label} onClick={() => item.onClick && item.onClick(...params)}>
                Invite {item.label}
              </a>
            ))}
          </Space>
        )}
      />
    </Table>
  );
};
export default BasicTable;
