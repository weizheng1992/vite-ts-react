import { useImperativeHandle } from 'react';
import type { FormProps, FormSchema } from '../types/form';
import type { NamePath } from 'antd/lib/form/interface';

import { isArray, isFunction, isObject, isString } from '/@/utils/is';
import { deepMerge } from '/@/utils';
import { dateItemType, handleInputNumberValue } from '../helper';
import { dateUtil } from '/@/utils/dateUtil';
import { cloneDeep, uniqBy } from 'lodash-es';
import { error } from '/@/utils/log';

interface UseFormActionContext {
  getProps: FormProps;
  schema: FormSchema[];
  formModel: Recordable;
  setFormModel: any;
  defaultValue: Recordable;
  formElRef: any;
  ref: any;
  setSchema: any;
  handleFormValues: Function;
}

export function useImperativeHandles({
  getProps,
  formModel,
  setFormModel,
  schema: getSchema,
  // defaultValue,
  formElRef: formRef,
  ref,
  setSchema,
  handleFormValues,
}: UseFormActionContext) {
  async function resetFields(): Promise<void> {
    await formRef?.current.resetFields();
  }
  async function setFieldsValue(values: Recordable): Promise<void> {
    const fields = getSchema.map((item) => item.field).filter(Boolean);

    const validKeys: string[] = [];
    Object.keys(values).forEach((key) => {
      const schema = getSchema.find((item) => item.field === key);
      let value = values[key];

      const hasKey = Reflect.has(values, key);

      value = handleInputNumberValue(schema?.component, value);
      let newFormModel = formModel;
      // 0| '' is allow
      if (hasKey && fields.includes(key)) {
        // time type
        if (itemIsDateType(key)) {
          if (Array.isArray(value)) {
            const arr: any[] = [];
            for (const ele of value) {
              arr.push(ele ? dateUtil(ele) : null);
            }
            newFormModel = Object.assign({}, formModel, { [key]: arr });
          } else {
            newFormModel = Object.assign({}, formModel, { [key]: value ? dateUtil(value) : null });
          }
        } else {
          newFormModel = Object.assign({}, formModel, { [key]: value });
        }
        setFormModel(newFormModel);
        formRef?.current.setFieldsValue(newFormModel);
        validKeys.push(key);
      }
    });
    validateFields(validKeys);
  }

  async function updateSchema(data: Partial<FormSchema> | Partial<FormSchema>[]) {
    let updateData: Partial<FormSchema>[] = [];
    if (isObject(data)) {
      updateData.push(data as FormSchema);
    }
    if (isArray(data)) {
      updateData = [...data];
    }

    const hasField = updateData.every((item) => Reflect.has(item, 'field') && item.field);

    if (!hasField) {
      error(
        'All children of the form Schema array that need to be updated must contain the `field` field'
      );
      return;
    }
    const schema: FormSchema[] = [];
    updateData.forEach((item) => {
      getSchema.forEach((val) => {
        if (val.field === item.field) {
          const newSchema = deepMerge(val, item);
          schema.push(newSchema as FormSchema);
        } else {
          schema.push(val);
        }
      });
    });
    setSchema(uniqBy(schema, 'field'));
  }
  async function removeSchemaByFiled(fields: string | string[]): Promise<void> {
    const schemaList: FormSchema[] = cloneDeep(getSchema);
    if (!fields) {
      return;
    }

    let fieldList: string[] = isString(fields) ? [fields] : fields;
    if (isString(fields)) {
      fieldList = [fields];
    }
    for (const field of fieldList) {
      _removeSchemaByFiled(field, schemaList);
    }
  }
  async function appendSchemaByField(
    schema: FormSchema,
    prefixField?: string,
    first = false
  ): Promise<void> {
    const schemaList: FormSchema[] = cloneDeep(getSchema);

    const index = schemaList.findIndex((schema) => schema.field === prefixField);
    const hasInList = schemaList.some((item) => item.field === prefixField || schema.field);

    if (!hasInList) return;

    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(schema) : schemaList.push(schema);
      setSchema(schemaList);
      return;
    }
    if (index !== -1) {
      schemaList.splice(index + 1, 0, schema);
    }
    setSchema(schemaList);
  }
  function getFieldsValue() {
    if (!formRef) return {};
    return handleFormValues(formModel);
  }
  /**
   * @description: Delete based on field name
   */
  function _removeSchemaByFiled(field: string, schemaList: FormSchema[]): void {
    if (isString(field)) {
      const index = schemaList.findIndex((schema) => schema.field === field);
      if (index !== -1) {
        delete formModel[field];
        setFormModel(formModel);
        schemaList.splice(index, 1);
      }
    }
  }
  async function validateFields(nameList?: NamePath[] | undefined): Promise<void> {
    await formRef?.current.validateFields(nameList);
  }
  async function scrollToField(name: NamePath, options?: ScrollOptions | undefined): Promise<void> {
    await formRef?.current.scrollToField(name, options);
  }
  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault();
    const { submitFunc } = getProps;
    if (submitFunc && isFunction(submitFunc)) {
      if (!formRef) return;
      try {
        const values = await formRef.current.validateFields();
        const res = handleFormValues(values);

        await submitFunc(res);
      } catch (error) {
        throw new Error(error);
      }
      return;
    }
  }
  ref &&
    useImperativeHandle(ref, () => ({
      resetFields,
      setFieldsValue,
      removeSchemaByFiled,
      appendSchemaByField,
      getFieldsValue,
      validateFields,
      scrollToField,
      handleSubmit,
      updateSchema,
    }));
  /**
   * @description: Is it time
   */
  function itemIsDateType(key: string) {
    return getSchema.some((item) => {
      return item.field === key ? dateItemType.includes(item.component) : false;
    });
  }
  return {
    resetFields,
    setFieldsValue,
    removeSchemaByFiled,
    appendSchemaByField,
    getFieldsValue,
    validateFields,
    scrollToField,
    handleSubmit,
    updateSchema,
  };
}
