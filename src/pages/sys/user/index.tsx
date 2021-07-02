/*
 * @Author: zz
 * @Date: 2021-06-29 16:26:05
 * @LastEditors: zz
 * @LastEditTime: 2021-07-02 18:12:53
 */
import React, { useEffect } from 'react';
import { BasicForm, FormProps, useForm } from '/@/components/Form';
// import { userInfo } from '/@/api/user/system';
import { schemas } from './search';
import Table from './table';

const User: React.FC = () => {
  // const [title] = useState('用户管理');
  // const [initVal, setInitVal] = useState('');

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
        console.log('1111 :>> ', 1111);
      },
      resetAction: () => {
        console.log('2222 :>> ', 2222);
      },
      advancedButtonOptions: { style: { fontSize: 12 } },
    },
  };

  const [register] = useForm();
  // const [register, { setFieldsValue, getFieldValue, setProps, updateSchema }] = useForm();

  // const load = async () => {
  //   // console.log('getFieldsValue :>> ', getFieldValue);
  //   const val = await getFieldValue('name');
  //   setInitVal(val);
  //   // console.log('val :>> ', val);
  //   // const user = userInfo({ user: 'zz' });
  //   // console.log('user :>> ', user);
  // };

  useEffect(() => {
    // load();
  }, []);
  return (
    <>
      {/* <PageHeader title={title} /> */}
      {/* <Card bordered={false}> */}
      <BasicForm {...formProps} onRegister={register} />
      <Table />
      {/* </Card> */}
    </>
  );
};

export default User;
