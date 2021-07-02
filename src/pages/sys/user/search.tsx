/*
 * @Author: zz
 * @Date: 2021-06-29 16:29:51
 * @LastEditors: zz
 * @LastEditTime: 2021-07-02 18:10:08
 */
// import React from 'react';
// import { Select } from 'antd';
import { FormSchema } from '/@/components/Form';

// const Option = Select.Option;

export const schemas: FormSchema[] = [
  {
    field: 'name',
    label: '文本框',
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
