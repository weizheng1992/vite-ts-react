import React from 'react';
import { Table, Space } from 'antd';
import { BasicTableProps } from './types/table';
// import TableColumn from './compontent/TableColumn';
// import TableAction from './compontent/TableAction';
import { ColumnProps, ColumnType } from 'antd/es/table';
const { Column, ColumnGroup } = Table;

const BasicTable: React.FC<BasicTableProps> = ({ actions, columns, tableProps }) => {
  console.log(columns);
  return (
    <Table {...tableProps}>
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
