/*
 * @Author: zz
 * @Date: 2021-06-29 16:29:51
 * @LastEditors: zz
 * @LastEditTime: 2021-07-12 16:41:40
 */
// import React from 'react';
// import { Select } from 'antd';
import { FormSchema } from '/@/components/Form';

// const Option = Select.Option;

export const schemas: FormSchema[] = [
  {
    field: 'names',
    label: '用户名',
    component: 'Input',
    // componentprops: ({ formActionType }) => {
    //   return {
    //     onChange: async (e) => {
    //       const { setFieldsValue } = formActionType;
    //       console.log('sss', e.target.value);
    //       await setFieldsValue({ Input2: e.target.value });
    //     },
    //   };
    // },
  },
  {
    field: 'Select',
    label: '下拉框',
    component: 'Select',
    // componentprops: ({ formActionType }) => {
    //   console.log('formActionType :>> ', formActionType);
    //   return {
    //     onChange: async (e) => {
    //       // const { setFieldsValue } = formActionType;
    //       // console.log('sss', e);
    //       // await setFieldsValue({ Input2: e.target.value });
    //     },
    //   };
    // },
  },
];
