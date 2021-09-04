/*
 * @Author: weizheng
 * @Date: 2021-07-17 16:03:13
 * @LastEditors: zz
 * @LastEditTime: 2021-07-29 17:33:36
 */
import React, { useRef, useState, useCallback } from 'react';
import { message, Button } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { BasicTable, TableRef } from '/@/components/Table';
import { menuListApi, menuUpdateApi } from '/@/api/sys/menu';
import type { MenuListItem } from '/@/api/sys/model/menuModel';
import { cloumns } from './menu';
import MenuDrawer from './MenuDrawer';
import Icon from '/@/components/Icon';

const Menu: React.FC = () => {
  const tableRef = useRef<NonNullable<TableRef>>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [tableItem, setTableItem] = useState<Nullable<MenuListItem>>(null);

  const handleClick = (...params) => {
    console.log('del', params);
  };
  const handleEdit = (record: any) => {
    setVisible(true);
    setTableItem({ ...record });
  };

  const onok = useCallback(async (values) => {
    values.menuId = tableItem?.menuId;
    const data: any = await menuUpdateApi(values);
    if (!data) {
      message.success('修改成功');
      onClose();
    }
  }, []);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleAddMenu = () => {
    setVisible(true);
    setTableItem(null);
  };
  return (
    <div>
      <div className="text-right mb-4">
        <Button type="primary" onClick={handleAddMenu}>
          新增
        </Button>
      </div>

      <Icon icon="ant-design:account-book-filled" />
      <BasicTable
        ref={tableRef}
        api={menuListApi}
        tableProps={{ pagination: false }}
        columns={cloumns}
        rowKey={'menuId'}
        actionProps={{ title: '操作', width: 200, fixed: 'right' }}
        actions={[
          {
            label: '',
            icon: <FormOutlined />,
            onClick: handleEdit,
            ifShow: (record) => record.orderNum !== 1,
          },
          {
            label: '',
            icon: <DeleteOutlined style={{ color: 'red' }} />,
            popConfirm: { title: '是否删除？', confirm: handleClick },
          },
        ]}
      />
      <MenuDrawer visible={visible} onClose={onClose} record={tableItem} onok={onok} />
    </div>
  );
};
export default Menu;
