/*
 * @Author: weizheng
 * @Date: 2021-06-29 17:18:09
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-07 19:46:23
 */
import React, { useRef } from 'react';
import { BasicTable, TableRef } from '/@/components/Table';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Button } from 'antd';
import { menuListApi } from '/@/api/sys/menu';
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const pagination: TablePaginationConfig = { position: ['bottomRight'] };
const Test = () => {
  const tableRef = useRef<NonNullable<TableRef>>(null);
  const handleClick = () => {
    console.log('dianjiel ');
  };
  const handleSearch = () => {
    tableRef.current?.handleSearchFunc({ serach: 'search' });
  };
  const columns: ColumnsType<Recordable> = [
    {
      title: 'id',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'username',
      width: 150,
    },
    {
      title: 'nickname',
      dataIndex: 'nickname',
      sorter: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: 150,
    },
  ];

  return (
    <>
      <Button onClick={handleSearch}>查询</Button>
      <BasicTable
        ref={tableRef}
        tableProps={{
          footer: footer,
          title: title,
          showHeader: showHeader,
          pagination: { ...pagination },
        }}
        api={menuListApi}
        searchInfo={{ user: 'admin' }}
        columns={columns}
        rowKey={'id'}
        actionProps={{ title: '操作', width: 200, fixed: 'right' }}
        actions={[
          {
            label: '编辑',
            onClick: handleClick,
          },
          { label: '删除', onClick: handleClick },
        ]}
      />
    </>
  );
};
export default Test;
