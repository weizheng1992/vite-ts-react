import React, { useEffect } from 'react';
import { BasicForm, FormProps, useForm } from '/@/components/Form';
import { Form, Input, Select, Button } from 'antd';

const Option = Select.Option;
const Index: React.FC = () => {
  const formProps: FormProps = {
    showAdvancedButton: true,
    schemas: [
      {
        field: 'Input',
        label: '文本框',
        component: 'Input',
        componentprops: ({ formActionType }) => {
          return {
            onChange: async (e) => {
              const { setFieldsValue } = formActionType;
              console.log('sss', e);
              await setFieldsValue({ Input2: e.target.value });
            },
          };
        },
      },
      {
        field: 'Input2',
        label: '文本框',
        component: 'Input',
      },
      {
        field: 'Select',
        label: '下拉',
        component: 'Select',
        componentprops: {
          options: [
            { label: 'label', value: 1 },
            { label: 'label2', value: 2 },
          ],
        },
      },
      {
        field: 'Checkbox',
        label: '多选',
        component: 'Checkbox',
        valuePropName: 'checked',
        renderComponentContent: 'Check',
      },
      {
        field: 'CheckboxGroup',
        label: '多选组',
        component: 'CheckboxGroup',
        componentprops: {
          options: [
            { label: 'label', value: 1 },
            { label: 'label2', value: 2 },
          ],
        },
      },
      {
        field: 'render',
        label: '自定义',
        component: 'Input',
        render: () => {
          return (
            <Input.Group compact>
              <Form.Item
                name={['render', 'province']}
                noStyle
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select placeholder="Select province" style={{ width: '50%' }}>
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={['render', 'street']}
                noStyle
                rules={[{ required: true, message: 'Street is required' }]}
              >
                <Input style={{ width: '50%' }} placeholder="Input street" />
              </Form.Item>
            </Input.Group>
          );
        },
      },
    ],
    formItemProps: {
      labelCol: { span: 8 },
    },
    formActionProps: {
      actionColOpt: { span: 24 },
      colStyle: { textAlign: 'center' },
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

      console.log(setFieldsValue({ Input: '3' }), aaa);
    }
    load();
  }, []);

  const onTest = async () => {
    await setProps({
      formItemProps: {
        labelCol: { span: 3 },
      },
    });
    await updateSchema({ field: 'Input2', label: 'updateSchema' });
  };
  return (
    <div>
      About
      <Button onClick={onTest}>改变布局12</Button>
      <div>
        <BasicForm {...formProps} onRegister={register} />
      </div>
    </div>
  );
};
export default Index;
