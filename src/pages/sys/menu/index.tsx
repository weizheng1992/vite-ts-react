/*
 * @Author: weizheng
 * @Date: 2021-07-17 16:03:13
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 18:06:13
 */
import React, { useRef, useState } from 'react';
import { BasicTable, TableRef } from '/@/components/Table';
import { menuListApi } from '/@/api/sys/menu';
import { cloumns } from './menu';
import MenuDrawer from './MenuDrawer';

const Menu: React.FC = () => {
  const tableRef = useRef<NonNullable<TableRef>>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {};
  const handleEdit = (record: Recordable) => {
    console.log(record);
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <BasicTable
        ref={tableRef}
        api={menuListApi}
        tableProps={{ pagination: false }}
        columns={cloumns}
        rowKey={'menuId'}
        actionWidth={100}
        actions={[
          {
            label: '编辑',
            onClick: handleEdit,
          },
          { label: '删除', onClick: handleClick },
        ]}
      />
      <MenuDrawer visible={visible} onClose={onClose} />
    </div>
  );
};
export default Menu;
