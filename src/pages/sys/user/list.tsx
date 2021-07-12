/*
 * @Author: zz
 * @Date: 2021-06-29 16:30:00
 * @LastEditors: zz
 * @LastEditTime: 2021-07-08 15:47:38
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
