import React from 'react';
import { Table } from 'antd';
import { BasicTableProps } from './types/table';
// import TableColumn from './compontent/TableColumn';
import TableAction from './compontent/TableAction';
import { ColumnProps } from 'antd/es/table';
const { Column, ColumnGroup } = Table;

const BasicTable: React.FC<BasicTableProps> = ({ actions, tableProps }) => {
  const { dataSource, columns } = tableProps;
  return (
    <Table dataSource={dataSource}>
      {columns?.map((item: ColumnProps<Recordable>, index: number) => {
        if (item.children) {
          return (
            <ColumnGroup title={item.title} key={index}>
              <Column title="First Name" dataIndex="firstName" key="firstName" />
              <Column title="Last Name" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
          );
        } else {
          return <Column {...item} key={index} />;
        }
      })}
      {actions && actions.length > 0 && <TableAction actions={actions} />}
    </Table>
  );
};
export default BasicTable;
