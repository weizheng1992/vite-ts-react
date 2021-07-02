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
      // filters: [
      //   { text: 'Male', value: 'male' },
      //   { text: 'Female', value: 'female' },
      // ],
    },
    {
      title: 'nickname',
      dataIndex: 'nickname',
      sorter: true,
      // children: [
      //   {
      //     title: '编号',
      //     dataIndex: 'no',
      //     width: 120,
      //     filters: [
      //       { text: 'Male', value: 'male', children: [] },
      //       { text: 'Female', value: 'female', children: [] },
      //     ],
      //   },

      //   {
      //     title: '开始时间',
      //     dataIndex: 'beginTime',
      //     width: 120,
      //   },
      //   {
      //     title: '结束时间',
      //     dataIndex: 'endTime',
      //     width: 120,
      //   },
      // ],
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: 150,
    },
    // {
    //   title: 'tags',
    //   width: 120,
    //   dataIndex: 'tags',
    //   render: (tags) => (
    //     <>
    //       {tags.map((tag: string) => (
    //         <Tag color="blue" key={tag}>
    //           {tag}
    //         </Tag>
    //       ))}
    //     </>
    //   ),
    // },
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
