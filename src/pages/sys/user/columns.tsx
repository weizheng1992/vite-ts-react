/*
 * @Author: zz
 * @Date: 2021-07-06 14:32:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 20:22:35
 */
import React from 'react';
import { Button } from 'antd';

const columnsFun = (userListDel: any) => {
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
            userListDel(record);
          }}
        >
          删除
        </Button>
      ),
    },
  ];
  return columns;
};

export default columnsFun;
