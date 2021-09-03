import React from 'react';
import { Table } from 'antd';

import { ColumnsType, ColumnProps } from 'antd/es/table';

const { Column, ColumnGroup } = Table;
interface Props {
  columns: ColumnsType<Recordable>;
}
const TableColumn: React.FC<Props> = ({ columns }) => {
  const getComList = () => {
    const compList: React.ReactElement[] = [];
    columns.map((item: ColumnProps<Recordable>, index: number) => {
      if (item.children) {
        compList.push(
          <ColumnGroup title={item.title} key={index}>
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
        );
      } else {
        compList.push(<Column {...item} key={index} />);
      }
    });
  };
  return <>{getComList()}</>;
};
export default TableColumn;
