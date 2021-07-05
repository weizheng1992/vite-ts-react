/*
 * @Author: weizheng
 * @Date: 2021-06-29 17:18:09
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-02 14:56:55
 */
import React from 'react';
import { BasicTable } from '/@/components/Table';
import { ColumnsType } from 'antd/es/table';
import { TablePaginationConfig } from 'antd/es/table';
import { demoListApi } from '/@/api/demo/table';
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const pagination: TablePaginationConfig = { position: ['bottomRight'] };
const Test = () => {
  const handleClick = () => {
    console.log('dianjiel ');
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
    <BasicTable
      tableProps={{
        footer: footer,
        title: title,
        showHeader: showHeader,
        pagination: { ...pagination },
      }}
      api={demoListApi}
      searchInfo={{ user: 'admin' }}
      columns={columns}
      rowKey={'id'}
      actions={[
        {
          label: '编辑',
          onClick: handleClick,
        },
        { label: '删除', onClick: handleClick },
      ]}
    />
  );
};
export default Test;
