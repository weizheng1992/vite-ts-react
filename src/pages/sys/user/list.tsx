/*
 * @Author: zz
 * @Date: 2021-06-29 16:30:00
 * @LastEditors: zz
 * @LastEditTime: 2021-07-13 15:00:36
 */
import React from 'react';
import { Table } from 'antd';
import columns from './columns';

interface Props {
  userInfoList: any;
  pagination: any;
}

const Tables: React.FC<Props> = ({ userInfoList, pagination }) => {
  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={userInfoList}
        pagination={{ ...pagination }}
      />
    </>
  );
};

export default Tables;
