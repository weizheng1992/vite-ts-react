/*
 * @Author: weizheng
 * @Date: 2021-07-17 17:54:56
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 19:13:28
 */
import React from 'react';
import { Drawer, Button } from 'antd';
import { BasicForm, FormProps, useForm } from '/@/components/Form';
import { formSchema } from './menu';
interface Props {
  visible: boolean;
  onClose: () => void;
}

const MenuDrawer: React.FC<Props> = ({ visible, onClose }) => {
  const formProps: FormProps = {
    schemas: formSchema,
    labelWidth: 100,
    baseColProps: { lg: 12, md: 24 },
  };
  const [register, { validateFields }] = useForm();
  const onOk = async () => {
    const values = await validateFields();
    console.log(values);
  };
  return (
    <Drawer
      title="Create a new account"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={onOk} type="primary">
            提交
          </Button>
        </div>
      }
    >
      <BasicForm {...formProps} onRegister={register} />
    </Drawer>
  );
};
export default MenuDrawer;
