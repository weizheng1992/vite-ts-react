import React from 'react';
import { Table, Space } from 'antd';
import { ActionItem } from '../types/tableAction';
const { Column } = Table;

interface Props {
  actions: ActionItem[];
}

const TableAction: React.FC<Props> = ({ actions }) => {
  return (
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
  );
};
export default TableAction;
