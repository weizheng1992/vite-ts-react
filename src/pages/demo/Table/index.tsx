import React from 'react';
import { BasicTable } from '/@/components/Table';
import { ColumnsType } from 'antd/es/table';
import { TablePaginationConfig } from 'antd/es/table';
import { Tag } from 'antd';
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const pagination: TablePaginationConfig = { position: ['bottomRight'] };
const Test = () => {
  const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const handleClick = () => {
    console.log('dianjiel ');
  };
  const columns: ColumnsType<Recordable> = [
    {
      title: 'ID',
      dataIndex: 'key',
      fixed: 'left',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'firstName',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '地址',
      dataIndex: 'address',
      sorter: true,
      children: [
        {
          title: '编号',
          dataIndex: 'no',
          width: 120,
          filters: [
            { text: 'Male', value: 'male', children: [] },
            { text: 'Female', value: 'female', children: [] },
          ],
        },

        {
          title: '开始时间',
          dataIndex: 'beginTime',
          width: 120,
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          width: 120,
        },
      ],
    },
    {
      title: '编号',
      dataIndex: 'lastName',
      width: 150,
      sorter: true,
    },
    {
      title: 'tags',
      width: 120,
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag: string) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
  ];
  return (
    <BasicTable
      tableProps={{
        dataSource: data,
        footer: footer,
        title: title,
        showHeader: showHeader,
        pagination: { ...pagination },
      }}
      columns={columns}
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
