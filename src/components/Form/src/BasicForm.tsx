import React, { useMemo, useState, useEffect, createRef, useCallback } from 'react';
import { Form, Row } from 'antd';
import FormItem from './components/FormItem';
import FormAction from './components/FormAction';

import type { FormActionType, FormSchema, FormProps } from './types/form';
import { FormInstance } from 'antd/lib/form';

import type { BasicProps } from './types/formProps';
import { dateItemType } from './helper';
import { useFormValues } from './hooks/useFormValues';
import { useImperativeHandles } from './hooks/useImperativeHandles';

import { isNullOrUnDef } from '/@/utils/is';
import { dateUtil } from '/@/utils/dateUtil';
import { deepMerge } from '/@/utils';
import './index.less';

const prefixCls = 'basic-form';

const BasicFormCom: React.FC<BasicProps> = (props) => {
  const [formModel, setFormModelState] = useState<Recordable>({});
  const [defaultValue, setDefaultValue] = useState<Recordable>({});
  const [propsState, setPropsState] = useState<Partial<BasicProps>>({});
  const [schema, setSchema] = useState<FormSchema[]>([]);
  const formElRef = createRef<FormInstance>();
  const [form] = Form.useForm();

  useEffect(() => {
    const { onRegister } = props;
    onRegister && onRegister(formActionType);
  }, []);

  async function setProps(formProps: Partial<FormProps>): Promise<void> {
    const setProps = deepMerge(propsState, formProps);
    setPropsState({ ...setProps });
  }

  const getProps = useMemo((): BasicProps => {
    return { ...props, ...propsState } as BasicProps;
  }, [propsState]);

  const getFormClass = useMemo(() => {
    let compact = '';
    if (getProps.compact) {
      compact = `${prefixCls}--compact`;
    }
    return `${prefixCls} ${compact}`;
  }, [getProps.compact]);

  useEffect(() => {
    const schemas: FormSchema[] = propsState.schemas || schema;
    if (schemas && schemas.length > 0) {
      for (const schema of schemas) {
        const { defaultValue, component } = schema;
        // handle date type
        if (defaultValue && dateItemType.includes(component)) {
          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = dateUtil(defaultValue);
          } else {
            const def: moment.Moment[] = [];
            defaultValue.forEach((item) => {
              def.push(dateUtil(item));
            });
            schema.defaultValue = def;
          }
        }
      }
      setSchema(schemas);
    }
  }, [propsState.schemas]);

  useEffect(() => {
    const obj: Recordable = {};
    schema.forEach((item) => {
      const { defaultValue } = item;
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue;
      }
    });
    setFormModelState(obj);
    setDefaultValue(obj);
  }, [schema]);
  const {
    transformDateFunc = (date: any) => {
      return date._isAMomentObject ? date?.format('YYYY-MM-DD HH:mm:ss') : date;
    },
    fieldMapToTime = [],
    // autoFocusFirstItem,
  } = props;
  const {
    handleFormValues,
    // initDefault
  } = useFormValues({
    transformDateFunc,
    fieldMapToTime,
    setDefaultValue,
    schema,
    formModel,
  });

  const {
    resetFields,
    setFieldsValue,
    removeSchemaByFiled,
    appendSchemaByField,
    getFieldsValue,
    validateFields,
    scrollToField,
    handleSubmit,
    updateSchema,
  } = useImperativeHandles({
    getProps,
    formModel,
    setFormModel,
    schema,
    defaultValue,
    formElRef,
    ref: getProps.fref,
    setSchema,
    handleFormValues,
  });

  const formActionType: Partial<FormActionType> = {
    resetFields,
    setFieldsValue,
    removeSchemaByFiled,
    appendSchemaByField,
    getFieldsValue,
    validateFields,
    scrollToField,
    submit: handleSubmit,
    updateSchema,
    setProps,
  };

  function setFormModel(key: string, value: any) {
    const obj = Object.assign({}, formModel, { [key]: value });
    setFormModelState(obj);
  }

  const onSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const { submitFunc } = props;
      submitFunc && submitFunc(values);
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }, []);

  const handleReset = useCallback(async () => {
    form.resetFields();
  }, []);

  return (
    <Form {...getProps.formProps} form={form} className={getFormClass} ref={formElRef}>
      <Row>
        {schema.map((schemaItem) => (
          <FormItem
            schema={schemaItem}
            formProps={getProps.formItemProps ? getProps.formItemProps : {}}
            formModel={formModel}
            allDefaultValues={defaultValue}
            key={schemaItem.field}
            setFormModel={setFormModel}
            formActionType={formActionType}
          />
        ))}
        <FormAction
          {...getProps.formActionProps}
          resetAction={handleReset}
          submitAction={onSubmit}
        />
      </Row>
    </Form>
  );
};

const BasicForm = React.forwardRef<React.Ref<FormInstance>, BasicProps>((props, ref) => (
  <BasicFormCom {...props} fref={ref} />
));

export default BasicForm;
