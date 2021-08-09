/*
 * @Author: weizheng
 * @Date: 2021-07-17 16:03:13
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 18:06:13
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { BasicTable, TableRef } from '/@/components/Table';
import { menuListApi } from '/@/api/sys/menu';
import type { MenuListItem } from '/@/api/sys/model/menuModel';
import { cloumns } from './menu';
import MenuDrawer from './MenuDrawer';
import { useImmer } from 'use-immer';

export interface ModalInfo {
  record: MenuListItem;
  isUpdate: boolean;
}

const Menu: React.FC = () => {
  const tableRef = useRef<NonNullable<TableRef>>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [tableItem, setTableItem] = useImmer<ModalInfo>({
    isUpdate: false,
    record: {} as MenuListItem,
  });

  const handleClick = (...params) => {
    console.log('del', params);
  };
  const handleEdit = (record: any) => {
    setVisible(true);
    setTableItem((draft) => {
      draft.isUpdate = true;
      draft.record = record;
    });
  };
  const memoModleInfo = useMemo(() => {
    return { ...tableItem };
  }, [tableItem.isUpdate]);
  const onClose = useCallback(() => {
    setVisible(false);
    setTableItem((draft) => {
      draft.isUpdate = false;
      draft.record = {} as MenuListItem;
    });
  }, []);
  return (
    <div>
      <BasicTable
        ref={tableRef}
        api={menuListApi}
        tableProps={{ pagination: false }}
        columns={cloumns}
        rowKey={'menuId'}
        actionWidth={200}
        actions={[
          {
            label: '编辑',
            onClick: handleEdit,
            ifShow: (record) => record.orderNum !== 1,
          },
          { label: '删除', popConfirm: { title: '是否删除？', confirm: handleClick } },
        ]}
      />
      <MenuDrawer visible={visible} onClose={onClose} {...memoModleInfo} />
    </div>
  );
};
export default Menu;
