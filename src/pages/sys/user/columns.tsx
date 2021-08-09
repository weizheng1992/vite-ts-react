/*
 * @Author: zz
 * @Date: 2021-07-06 14:32:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 16:27:15
 */
import React from 'react';
import { Button, Modal } from 'antd';
const { confirm } = Modal;

const showDeleteConfirm = (record) => {
  confirm({
    title: '你确定要删除吗?',
    onOk() {
      console.log('record :>> ', record);
      console.log(777);
    },
    onCancel() {
      console.log(6666);
    },
  });
};

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'age',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    // render: (tags) => (
    //   <>
    //     {tags.map((tag) => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Button
        type="primary"
        danger
        onClick={() => {
          showDeleteConfirm(record);
        }}
      >
        删除
      </Button>
    ),
  },
];

export default columns;
