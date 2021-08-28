/*
 * @Author: zz
 * @Date: 2021-06-29 16:26:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-28 16:39:50
 */
import React, { useEffect, useState } from 'react';
import { BasicForm, FormProps, useForm } from '/@/components/Form';
import { Modal } from 'antd';
// import { userInfo } from '/@/api/user/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserSysRequest, UserSysDel } from '../../../store/actions/sysUser';
import { Pagination } from '/@/store/types/sysUser';
import { UserLists } from '/@/api/system/model/userModel';
import { schemas } from './search';
import List from './list';

export interface Page {
  size: number;
  page: number;
}

const { confirm } = Modal;

const User: React.FC = () => {
  // const [title] = useState('用户管理');
  // const [initVal, setInitVal] = useState('');
  const [page, setPage] = useState<Page>({ page: 1, size: 10 });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSysList: UserLists[] = useSelector((state: any) => state.sysUser.userInfoList);
  const pagination: Pagination = useSelector((state: any) => state.sysUser.pagination);
  // const { userId }: LoginResultModel = useSelector<RootState, LoginResultModel>(
  //   (state: RootState) => state.login.userInfo,
  //   shallowEqual
  // );

  // const [register] = useForm();
  const [register, { getFieldsValue, resetFields }] = useForm();

  const searchList = async () => {
    const ser = await getFieldsValue();
    dispatch(UserSysRequest({ ...ser, ...page }, () => navigate('')));
  };

  const formProps: FormProps = {
    showAdvancedButton: true,
    schemas: schemas,
    formItemProps: {
      labelCol: { span: 8 },
    },
    formActionProps: {
      actionColOpt: { span: 24 },
      colStyle: { textAlign: 'right' },
      resetButtonOptions: {
        text: '重置',
      },
      submitButtonOptions: {
        text: '查询',
      },
      submitAction: () => {
        searchList();
      },
      resetAction: () => {
        resetFields();
        searchList();
      },
      advancedButtonOptions: { style: { fontSize: 12 } },
    },
  };

  const userListDel = (record: UserLists) => {
    confirm({
      title: '你确定要删除吗?',
      onOk() {
        dispatch(UserSysDel({ id: record.user_id }, () => navigate('')));
      },
      // onCancel() {
      //   console.log(6666);
      // },
    });
  };

  useEffect(() => {
    searchList();
  }, [page]);
  return (
    <>
      <BasicForm {...formProps} onRegister={register} />
      <List
        userInfoList={userSysList}
        pagination={pagination}
        setPage={setPage}
        userListDel={userListDel}
      />
    </>
  );
};

export default User;
