import type { FormSchema, FormProps } from '../types/form';
import { isArray, isObject, isString, isFunction } from '/@/utils/is';
import { deepMerge } from '/@/utils';
import { dateUtil } from '/@/utils/dateUtil';
import { dateItemType, handleInputNumberValue } from '../helper';
import { cloneDeep, uniqBy } from 'lodash-es';

interface UseFormActionContext {
  getProps: FormProps;
  getSchema: FormSchema[];
  formModalVal: Recordable;
  defaultValue: Recordable;
  setSchemaState: Fn;
  handleFormValues: Fn;
  setFormModalVal: Fn;
  validateFields: Fn;
  submit: Fn;
  setFieldsValueForm: Fn;
  resetFieldsForm: Fn;
}
export function useFormEvents({
  getSchema,
  setSchemaState,
  getProps,
  formModalVal,
  defaultValue,
  submit,
  handleFormValues,
  validateFields,
  setFormModalVal,
  setFieldsValueForm,
  resetFieldsForm,
}: UseFormActionContext) {
  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = getProps;
    if (resetFunc && isFunction(resetFunc)) {
      resetFieldsForm();
      await resetFunc();
    } else {
      resetFieldsForm();
    }
    setFormModalVal({ ...defaultValue });
    // validateFields();
    // emit('reset', toRaw(formModel));
    submitOnReset && handleSubmit();
  }

  /**
   * @description: Set form value
   */
  async function setFieldsValue(values: Recordable): Promise<void> {
    const fields = getSchema.map((item) => item.field).filter(Boolean);

    const validKeys: string[] = [];
    Object.keys(values).forEach((key) => {
      const schema = getSchema.find((item) => item.field === key);
      let value = values[key];

      const hasKey = Reflect.has(values, key);

      value = handleInputNumberValue(schema?.component, value);
      // 0| '' is allow
      if (hasKey && fields.includes(key)) {
        // time type
        if (itemIsDateType(key)) {
          if (Array.isArray(value)) {
            const arr: any[] = [];
            for (const ele of value) {
              arr.push(ele ? dateUtil(ele) : null);
            }
            setFormModalVal((preState) => {
              preState[key] = arr;
              return { ...preState };
            });
          } else {
            const { componentprops } = schema || {};
            let _props = componentprops as any;
            if (typeof componentprops === 'function') {
              _props = _props({ formModalVal });
            }
            setFormModalVal((preState) => {
              preState[key] = value ? (_props?.valueFormat ? value : dateUtil(value)) : null;
              return { ...preState };
            });
          }
        } else {
          setFormModalVal((preState) => {
            preState[key] = value;
            return { ...preState };
          });
        }
        validKeys.push(key);
      }
      setFieldsValueForm(values);
    });
    validateFields(validKeys);
  }
  function itemIsDateType(key: string) {
    return getSchema.some((item) => {
      return item.field === key ? dateItemType.includes(item.component) : false;
    });
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
      console.error(
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
    setSchemaState(uniqBy(schema, 'field'));
  }
  /**
   * @description: Delete based on field name
   */
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
    setSchemaState(schemaList);
  }
  /**
   * @description: Delete based on field name
   */
  function _removeSchemaByFiled(field: string, schemaList: FormSchema[]): void {
    if (isString(field)) {
      const index = schemaList.findIndex((schema) => schema.field === field);
      if (index !== -1) {
        // delete formModel[field];
        schemaList.splice(index, 1);
      }
    }
  }

  /**
   * @description: Insert after a certain field, if not insert the last
   */
  async function appendSchemaByField(schema: FormSchema, prefixField?: string, first = false) {
    const schemaList: FormSchema[] = cloneDeep(getSchema);

    const index = schemaList.findIndex((schema) => schema.field === prefixField);
    const hasInList = schemaList.some((item) => item.field === prefixField || schema.field);

    if (!hasInList) return;

    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(schema) : schemaList.push(schema);
      setSchemaState(schemaList);
      return;
    }
    if (index !== -1) {
      schemaList.splice(index + 1, 0, schema);
    }
    setSchemaState(schemaList);
  }
  /**
   * @description: Form submission
   */
  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault();
    const { submitFunc } = getProps;

    try {
      const values = await validateFields();
      const res = handleFormValues(values);
      if (submitFunc && isFunction(submitFunc)) {
        await submitFunc(res);
        return;
      } else {
        submit(res);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return { updateSchema, removeSchemaByFiled, appendSchemaByField, resetFields, setFieldsValue };
}
