import { isArray, isFunction, isObject, isString, isNullOrUnDef } from '/@/utils/is';
import { dateUtil } from '/@/utils/dateUtil';
import type { FormProps, FormSchema } from '../types/form';
import { set } from 'lodash-es';

interface UseFormValuesContext {
  setDefaultValue: (_: any | ((preState: any) => any)) => void;
  getSchema: FormSchema[];
  getProps: FormProps;
  setFormModalVal: (_: any | ((preState: any) => any)) => void;
}
export function useFormValues({
  setDefaultValue,
  getSchema,
  setFormModalVal,
  getProps,
}: UseFormValuesContext) {
  // Processing form values
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {};
    }
    const res: Recordable = {};
    for (const item of Object.entries(values)) {
      let [, value] = item;
      const [key] = item;
      if ((isArray(value) && value.length === 0) || isFunction(value)) {
        continue;
      }
      const transformDateFunc = getProps.transformDateFunc;
      if (isObject(value)) {
        value = transformDateFunc?.(value);
      }
      if (isArray(value) && value[0]?._isAMomentObject && value[1]?._isAMomentObject) {
        value = value.map((item) => transformDateFunc?.(item));
      }
      // Remove spaces
      if (isString(value)) {
        value = value.trim();
      }
      set(res, key, value);
    }
    return handleRangeTimeValue(res);
  }

  /**
   * @description: Processing time interval parameters
   */
  function handleRangeTimeValue(values: Recordable) {
    const fieldMapToTime = getProps.fieldMapToTime;

    if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
      return values;
    }

    for (const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] of fieldMapToTime) {
      if (!field || !startTimeKey || !endTimeKey || !values[field]) {
        continue;
      }

      const [startTime, endTime]: string[] = values[field];

      values[startTimeKey] = dateUtil(startTime).format(format);
      values[endTimeKey] = dateUtil(endTime).format(format);
      Reflect.deleteProperty(values, field);
    }

    return values;
  }

  function initDefault() {
    const schemas = getSchema;
    const obj: Recordable = {};
    schemas.forEach((item) => {
      const { defaultValue } = item;
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue;
        setFormModalVal((preState: any) => {
          preState[item.field] = defaultValue;
          return { ...preState };
        });
      }
    });
    setDefaultValue({ ...obj });
  }

  return { handleFormValues, initDefault };
}
