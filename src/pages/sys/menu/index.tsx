/*
 * @Author: weizheng
 * @Date: 2021-07-17 16:03:13
 * @LastEditors: zz
 * @LastEditTime: 2021-07-29 17:33:36
 */
import React, { useRef, useCallback } from 'react';
import { message, Button } from 'antd';
import { BasicTable, TableRef } from '/@/components/Table';
import { menuListApi, menuUpdateApi } from '/@/api/sys/menu';
import type { MenuListItem } from '/@/api/sys/model/menuModel';
import { cloumns } from './menu';
import MenuDrawer from './MenuDrawer';
import { useImmer } from 'use-immer';

interface State {
  visible: boolean;
  tableItem: Nullable<MenuListItem>;
}

const Menu: React.FC = () => {
  const tableRef = useRef<NonNullable<TableRef>>(null);
  const [state, setState] = useImmer<State>({
    visible: false,
    tableItem: null,
  });
  // const [visible, setVisible] = useState<boolean>(false);
  // const [tableItem, setTableItem] = useState<Nullable<MenuListItem>>(null);

  const handleClick = (...params) => {
    console.log('del', params);
  };
  const handleEdit = (record: any) => {
    setState((draft) => {
      draft.visible = true;
      draft.tableItem = { ...record };
    });
  };

  const onok = useCallback(async (values) => {
    values.menuId = state.tableItem?.id;
    const data: any = await menuUpdateApi(values);
    if (!data) {
      message.success('修改成功');
      onClose();
    }
  }, []);
  const onClose = useCallback(() => {
    // setVisible(false);
    setState((draft) => {
      draft.visible = false;
    });
  }, []);

  const handleAddMenu = () => {
    setState((draft) => {
      draft.visible = true;
      draft.tableItem = null;
    });
  };
  return (
    <div>
      <div className="text-right mb-4">
        <Button type="primary" onClick={handleAddMenu}>
          新增
        </Button>
      </div>
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
            icon: 'clarity:note-edit-line',
            onClick: handleEdit,
            ifShow: (record) => record.orderNum !== 1,
          },
          {
            label: '',
            icon: 'ant-design:delete-outlined',
            color: 'error',
            popConfirm: { title: '是否删除？', confirm: handleClick },
          },
        ]}
      />
      <MenuDrawer {...state} onClose={onClose} onok={onok} />
    </div>
  );
};
export default Menu;
