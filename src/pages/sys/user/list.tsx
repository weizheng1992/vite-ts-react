/*
 * @Author: zz
 * @Date: 2021-06-29 16:30:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 15:19:17
 */
import React from 'react';
import { Table } from 'antd';
import columns from './columns';

interface Props {
  userInfoList: any;
  pagination: any;
  setPage: any;
}

const Tables: React.FC<Props> = ({ userInfoList, pagination, setPage }) => {
  const onChangeTable = (pagination) => {
    const { current, pageSize } = pagination;
    setPage({ page: current, size: pageSize });
  };

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={userInfoList}
        pagination={{ ...pagination }}
        onChange={onChangeTable}
      />
    </>
  );
};

export default Tables;
