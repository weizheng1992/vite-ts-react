import type { FormSchema } from '../types/form';
import { isArray, isObject, isString } from '/@/utils/is';
import { deepMerge } from '/@/utils';
import { cloneDeep, uniqBy } from 'lodash-es';

interface UseFormActionContext {
  // getProps: FormProps;
  getSchema: FormSchema[];
  setSchemaState: Fn;
}
export function useFormEvents({ getSchema, setSchemaState }: UseFormActionContext) {
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
  return { updateSchema, removeSchemaByFiled, appendSchemaByField };
}
