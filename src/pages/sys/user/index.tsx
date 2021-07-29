/*
 * @Author: zz
 * @Date: 2021-06-29 16:26:05
 * @LastEditors: zz
 * @LastEditTime: 2021-07-13 15:00:10
 */
import React, { useEffect } from 'react';
import { BasicForm, FormProps, useForm } from '/@/components/Form';
// import { userInfo } from '/@/api/user/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserSysRequest } from '../../../store/actions/sysUser';
import { schemas } from './search';
import List from './list';

const User: React.FC = () => {
  // const [title] = useState('用户管理');
  // const [initVal, setInitVal] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSysList: any = useSelector((state: any) => state.sysUser.userInfoList);
  const pagination: any = useSelector((state: any) => state.sysUser.pagination);
  console.log('userSysList 8888:>> ', userSysList);
  // const { userId }: LoginResultModel = useSelector<RootState, LoginResultModel>(
  //   (state: RootState) => state.login.userInfo,
  //   shallowEqual
  // );

  // const [register] = useForm();
  const [register, { getFieldsValue, resetFields }] = useForm();

  const searchList = async () => {
    const ser = await getFieldsValue();
    dispatch(UserSysRequest({ ...ser }, () => navigate('')));
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

  useEffect(() => {
    searchList();
  }, []);

  return (
    <>
      <BasicForm {...formProps} onRegister={register} />
      <List userInfoList={userSysList} pagination={pagination} />
    </>
  );
};

export default User;
