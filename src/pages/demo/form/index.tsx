/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2021-06-28 17:22:48
 * @LastEditors: zz
 * @LastEditTime: 2021-07-02 17:53:06
 */
import React, { useEffect } from 'react';
import { BasicForm, FormProps, useForm } from '/@/components/Form';
import { Button, Space } from 'antd';
import { schemas } from './formItem';

const Index: React.FC = () => {
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
        text: '确定',
      },
      advancedButtonOptions: { style: { fontSize: 12 } },
    },
  };

  const [register, { setFieldsValue, getFieldsValue, setProps, updateSchema }] = useForm();

  useEffect(() => {
    async function load() {
      const aaa = await getFieldsValue();
      console.log(aaa);
    }
    load();
  }, []);

  const handleChangeLayout = async () => {
    await setProps({
      formItemProps: {
        labelCol: { span: 12 },
      },
    });
  };
  const handleChangeLabel = async () => {
    await updateSchema({ field: 'Input2', label: 'updateSchema' });
  };
  const handleChangeValue = async () => {
    await setFieldsValue({ Input: '3' });
  };
  return (
    <div>
      <div className="mb-4">
        <Space>
          <Button onClick={handleChangeLayout}>改变布局</Button>
          <Button onClick={handleChangeLabel}>改变label</Button>
          <Button onClick={handleChangeValue}>赋值文本框</Button>
        </Space>
      </div>
      <div>
        <BasicForm {...formProps} onRegister={register} />
      </div>
    </div>
  );
};
export default Index;
