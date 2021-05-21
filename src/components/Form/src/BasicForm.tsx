import React, { useState, useEffect, useMemo } from 'react';
import { Form, Row } from 'antd';
import { FormProps, FormActionType, FormSchema } from './types/form';
import FormItem from './components/FormItem';
import FormAction from './components/FormAction';

import { deepMerge } from '/@/utils';
import { dateItemType } from './helper';
import { dateUtil } from '/@/utils/dateUtil';

import { useFormEvents } from './hooks/useFormEvents';

const BasicForm: React.FC<FormProps> = (props) => {
  const [isAdvanced, setAsAdvanced] = useState<boolean>(false);
  const [schemaState, setSchemaState] = useState<Nullable<FormSchema[]>>(null);
  const [allProps, setAllprops] = useState<FormProps>({});
  const [form] = Form.useForm();
  const {
    scrollToField,
    submit,
    setFieldsValue,
    resetFields,
    getFieldValue,
    getFieldsValue,
    validateFields,
  } = form;

  useEffect(() => {
    onRegister && onRegister(formActionType);
  }, []);

  const setProps = async (formProps: FormProps): Promise<void> => {
    const obj = deepMerge(allProps, formProps);
    setAllprops({ ...obj });
  };

  const getProps = useMemo((): FormProps => {
    return { ...props, ...allProps } as FormProps;
  }, [allProps]);

  const { schemas = [], onRegister, actionSpan = 3, showAdvancedButton } = getProps;

  const getSchema = useMemo(() => {
    const schemas: FormSchema[] = schemaState || (getProps.schemas as any);
    let count = 0;
    if (showAdvancedButton) {
      const spanLength = schemas.length < actionSpan ? schemas.length : actionSpan;
      count = isAdvanced ? schemas.length : spanLength;
    }
    const schemasList = schemas.map((schema, index) => {
      const { defaultValue, component } = schema;
      if (count && index >= count) {
        schema.isAdvanced = true;
      }
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
      return schema;
    });
    return schemasList as FormSchema[];
  }, [schemas, schemaState]);

  const { updateSchema, removeSchemaByFiled, appendSchemaByField } = useFormEvents({
    getSchema,
    setSchemaState,
  });
  const formActionType: FormActionType = {
    scrollToField,
    submit,
    setFieldsValue,
    resetFields,
    getFieldValue,
    getFieldsValue,
    validateFields,
    setProps,
    updateSchema,
    removeSchemaByFiled,
    appendSchemaByField,
  };
  const renderItem = () => {
    const { formItemProps } = getProps;
    const children: any = [];
    getSchema.map((schema) => {
      children.push(
        <FormItem
          key={schema.field}
          itemProps={formItemProps}
          labelCol={formItemProps ? formItemProps.labelCol : {}}
          schema={schema}
          formActionType={formActionType}
          showAdvancedButton={showAdvancedButton}
          isAdvancedAction={isAdvanced}
        />
      );
    });
    return children;
  };
  //折叠按钮
  const advancedAction = (): void => {
    setAsAdvanced(!isAdvanced);
  };
  //提交按钮
  const onFinish = (value: any) => {
    console.log(value);
  };
  //重置按钮
  const resetAction = () => {
    form.resetFields();
  };
  console.log('getSchema', getSchema);
  return (
    <Form {...getProps.formProps} form={form} onFinish={onFinish}>
      <Row gutter={24}>
        {getSchema.length > 0 && renderItem()}
        <FormAction
          {...getProps.formActionProps}
          advancedAction={advancedAction}
          showAdvancedButton={getSchema.length < actionSpan ? false : getProps.showAdvancedButton}
          isAdvanced={isAdvanced}
          resetAction={resetAction}
        />
      </Row>
    </Form>
  );
};

export default BasicForm;
