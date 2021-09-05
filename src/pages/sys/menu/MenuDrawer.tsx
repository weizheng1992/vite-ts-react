/*
 * @Author: weizheng
 * @Date: 2021-07-17 17:54:56
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 19:13:28
 */
import React, { memo, useEffect, useMemo } from 'react';
import { Drawer, Button } from 'antd';
import { BasicForm, FormProps, useForm } from '/@/components/Form';
import { formSchema } from './menu';
import type { MenuListItem } from '/@/api/sys/model/menuModel';
interface Props {
  visible: boolean;
  onClose: () => void;
  onok: (values: any) => Promise<void>;
  tableItem: Nullable<MenuListItem>;
}

const MenuDrawer: React.FC<Props> = ({ visible, onClose, onok, tableItem }) => {
  const formProps: FormProps = useMemo(
    () => ({
      schemas: formSchema,
      labelWidth: 100,
      baseColProps: { lg: 12, md: 24 },
    }),
    []
  );

  const [register, { validateFields, setFieldsValue, resetFields }] = useForm();

  useEffect(() => {
    resetFields();
    visible && setFieldsValue({ ...tableItem });
  }, [visible]);

  const onOk = async () => {
    try {
      const values: any = await validateFields();

      onok(values);
    } catch (error) {}
  };
  const handleClose = async () => {
    resetFields();
    onClose();
  };
  return (
    <Drawer
      title="Create a new account"
      width={720}
      onClose={handleClose}
      destroyOnClose={false}
      forceRender
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
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
