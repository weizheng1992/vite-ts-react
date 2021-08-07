import React from 'react';
import { Space, Popconfirm, Button } from 'antd';
import { ActionItem } from '../types/tableAction';
import { isBoolean, isFunction } from '/@/utils/is';

interface Props {
  actions: ActionItem[];
  params: any[];
}

const TableAction: React.FC<Props> = ({ actions, params }) => {
  const renderAcItem = (item: ActionItem) => {
    const { popConfirm, label, className, style, icon, onClick, ifShow } = item;
    function isIfShow() {
      let isIfShow = true;

      if (isBoolean(ifShow)) {
        isIfShow = ifShow;
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(params[1]);
      }
      return isIfShow;
    }
    if (popConfirm && isIfShow()) {
      const { title, confirm, cancel, cancelText = '否', okText = '是', icon } = popConfirm;
      return (
        <Popconfirm
          key={item.label}
          title={title}
          onConfirm={() => confirm && confirm(params)}
          onCancel={cancel}
          cancelText={cancelText}
          okText={okText}
          icon={icon}
          className={className}
          style={style}
        >
          <Button type="link"> {label}</Button>
        </Popconfirm>
      );
    } else {
      return (
        isIfShow() && (
          <Button
            key={item.label}
            className={className}
            style={style}
            icon={icon}
            type="link"
            onClick={() => onClick && onClick(...params)}
          >
            {label}
          </Button>
        )
      );
    }
  };

  return (
    <Space size="middle">
      {actions.map((item) => {
        return renderAcItem(item);
        // return (
        //   <a key={item.label} onClick={() => item.onClick && item.onClick(...params)}>
        //     Invite {item.label}
        //   </a>
        // );
      })}
    </Space>
  );
};
export default TableAction;
