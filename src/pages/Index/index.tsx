import React, { useEffect } from 'react';
import { Button } from 'antd';

// import { Tinymce } from '/@/components/Tinymce';
import { BasicForm, FormSchema, useForm } from '/@/components/Form';
const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    defaultValue: '333',
    label: '字段1',
    required: true,
    colProps: {
      span: 24,
    },
    // componentProps:{},
    // can func
    componentProps: ({ schema, formModel, formActionType }) => {
      return {
        placeholder: '自定义placeholder',
        onChange: async (e: any) => {
          console.log('4444444444444444444', e, schema, formModel, formActionType);
          const { updateSchema } = formActionType;
          console.log(updateSchema);
          await updateSchema({ field: 'field2', label: '哈哈哈 ' });
        },
      };
    },
  },
  {
    field: 'field2',
    component: 'Input',
    label: '带后缀',
    defaultValue: '111',
    colProps: {
      span: 8,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log('000000000000000000', e);
      },
    },
    suffix: '天',
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'field5',
    component: 'CheckboxGroup',
    label: '字段5',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field7',
    component: 'RadioGroup',
    label: '字段7',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field8',
    component: 'Checkbox',
    label: '字段8',
    required: true,
    colProps: {
      span: 8,
    },
    valuePropName: 'checked',
    renderComponentContent: 'Check',
  },
  {
    field: 'field9',
    component: 'Switch',
    label: '字段9',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'field11',
    component: 'Cascader',
    label: '字段11',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    },
  },
];
const Index: React.FC = () => {
  // const childRef = useRef<any>();
  // const formElRef = useRef<any>(null);

  useEffect(() => {
    // console.log(formElRef?.current);
    // formElRef?.current.setFieldsValue({
    //   field3: 'sdsds',
    //   field4: '1',
    //   field5: '1',
    //   field11: ['zhejiang', 'hangzhou', 'xihu'],
    // });
  }, []);
  const handleGetData = async () => {
    // console.log(childRef.current.getValue());
    // await formElRef?.current.handleSubmit();
    setProps({ formActionProps: { showResetButton: false } });
  };
  // const handleSubmit = async (value: string) => {
  //   console.log(formElRef);
  //   console.log('7777777', value);
  // };
  const [register, { setProps }] = useForm({
    schemas: schemas,
    formItemProps: { labelWidth: 100 },
  });
  const handleGetData2 = () => {
    setProps({ formItemProps: { labelWidth: 50 } });
  };
  return (
    <div className="py-4">
      {/* <Tinymce modelValue="wwwwww" ediRef={childRef} onChange={handleEditor} /> */}
      <BasicForm onRegister={register} />
      <Button type="primary" className="mx-4" onClick={handleGetData}>
        Index
      </Button>
      <Button type="primary" className="mx-4" onClick={handleGetData2}>
        Index2
      </Button>
    </div>
  );
};
export default Index;
