/*
 * @Author: zz
 * @Date: 2021-06-29 16:30:00
 * @LastEditors: zz
 * @LastEditTime: 2021-07-06 19:18:40
 */
import React from 'react';
import { Table } from 'antd';
import columns from './columns';

interface Props {
  userInfoList: any;
}

const Tables: React.FC<Props> = ({ userInfoList }) => {
  return (
    <>
      <Table columns={columns} dataSource={userInfoList} />
    </>
  );
};

export default Tables;
