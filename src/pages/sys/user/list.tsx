/*
 * @Author: zz
 * @Date: 2021-06-29 16:30:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-13 17:41:44
 */
import React from 'react';
import { Table } from 'antd';
import columnsFun from './columns';
import { Pagination } from '/@/store/types/sysUser';
import { UserLists } from '/@/api/system/model/userModel';
import { Page } from './index';

interface Props {
  userInfoList: UserLists[];
  pagination: Pagination;
  setPage: (val: Page) => any;
  userListDel: (val: UserLists) => any;
}

const Tables: React.FC<Props> = ({ userInfoList, pagination, setPage, userListDel }) => {
  const onChangeTable = (pagination) => {
    const { current, pageSize } = pagination;
    setPage({ page: current, size: pageSize });
  };

  return (
    <>
      <Table
        columns={columnsFun(userListDel)}
        rowKey={(record) => record.user_id}
        dataSource={userInfoList}
        pagination={{ ...pagination }}
        onChange={onChangeTable}
      />
    </>
  );
};

export default Tables;
