/*
 * @Author: weizheng
 * @Date: 2021-07-17 17:54:56
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 19:13:28
 */
import React, { memo, useEffect } from 'react';
import { Drawer, Button, message } from 'antd';
import { BasicForm, FormProps, useForm } from '/@/components/Form';
import { formSchema } from './menu';
import type { MenuListItem } from '/@/api/sys/model/menuModel';
import { menuUpdateApi } from '/@/api/sys/menu';
interface Props {
  visible: boolean;
  onClose: () => void;
  isUpdate: boolean;
  record: MenuListItem;
}

const MenuDrawer: React.FC<Props> = ({ visible, onClose, isUpdate, record }) => {
  const formProps: FormProps = {
    schemas: formSchema,
    labelWidth: 100,
    baseColProps: { lg: 12, md: 24 },
  };

  const [register, { validateFields, setFieldsValue }] = useForm();

  useEffect(() => {
    if (isUpdate) {
      setFieldsValue(record);
    }
  }, [isUpdate]);

  const onOk = async () => {
    const values: any = await validateFields();
    console.log('ssss', values);
    values.menuId = record.menuId;
    const data: any = await menuUpdateApi(values);
    if (!data) {
      message.success('修改成功');
    }
  };
  const handleClose = async () => {
    onClose();
  };
  return (
    <Drawer
      title="Create a new account"
      width={720}
      onClose={handleClose}
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
export default memo(MenuDrawer);
