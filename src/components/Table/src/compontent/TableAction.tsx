import React from 'react';
import { Space } from 'antd';
import { ActionItem } from '../types/tableAction';

interface Props {
  actions: ActionItem[];
  params: any[];
}

const TableAction: React.FC<Props> = ({ actions, params }) => {
  console.log(actions);
  return (
    <Space size="middle">
      {actions.map((item) => {
        return (
          <a key={item.label} onClick={() => item.onClick && item.onClick(...params)}>
            Invite {item.label}
          </a>
        );
      })}
    </Space>
  );
};
export default TableAction;
