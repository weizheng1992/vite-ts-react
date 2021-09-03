import React from 'react';
import { Form, Input, Select } from 'antd';
import { FormSchema } from '/@/components/Form';

const Option = Select.Option;

export const schemas: FormSchema[] = [
  {
    field: 'Input',
    label: '文本框',
    component: 'Input',
    componentprops: ({ formActionType }) => {
      return {
        onChange: async (e) => {
          const { setFieldsValue } = formActionType;
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
    valuePropName: 'checked',
    componentprops: {
      options: [
        { label: 'label', value: '1' },
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
];
