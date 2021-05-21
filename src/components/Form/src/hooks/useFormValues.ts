import { isArray, isFunction, isObject, isString, isNullOrUnDef } from '/@/utils/is';
import { dateUtil } from '/@/utils/dateUtil';

import type { FieldMapToTime, FormSchema } from '../types/form';

interface UseFormValuesContext {
  transformDateFunc: Function;
  fieldMapToTime: FieldMapToTime;
  setDefaultValue: any;
  schema: FormSchema[];
  formModel: Recordable;
}
export function useFormValues({
  transformDateFunc,
  fieldMapToTime,
  setDefaultValue,
  schema,
  formModel,
}: UseFormValuesContext) {
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
      if (isObject(value)) {
        value = transformDateFunc(value);
      }
      if (isArray(value) && value[0]?._isAMomentObject && value[1]?._isAMomentObject) {
        value = value.map((item) => transformDateFunc(item));
      }
      if (isString(value)) {
        value = value.trim();
      }
      res[key] = value;
    }
    return handleRangeTimeValue(res);
  }
  const handleRangeTimeValue = (values: Recordable) => {
    if (!fieldMapToTime || !isArray(fieldMapToTime)) {
      return values;
    }
    for (const item in fieldMapToTime) {
      const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] = item;
      if (!field || !startTimeKey || !endTimeKey || !values[field]) {
        continue;
      }
      const [startTime, endTime]: string[] = values[field];
      values[startTimeKey] = dateUtil(startTime).format(format);

      values[endTimeKey] = dateUtil(endTime).format(format);
      Reflect.deleteProperty(values, field);
    }
    return values;
  };
  function initDefault() {
    const obj: Recordable = {};
    schema.forEach((item) => {
      const { defaultValue } = item;
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue;
        formModel[item.field] = defaultValue;
      }
    });
    setDefaultValue(obj);
  }
  return { handleFormValues, initDefault };
}
