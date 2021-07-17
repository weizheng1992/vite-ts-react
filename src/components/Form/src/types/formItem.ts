/*
 * @Author: weizheng
 * @Date: 2021-05-19 18:31:04
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 19:12:36
 */
import { FormSchema, FormActionType, BasicFormItemProps } from './form';
import type { ColProps } from 'antd/lib/grid/col';
export interface FormItemAllProps {
  formActionType: FormActionType;
  schema?: FormSchema;
  labelWidth?: number | string;
  labelCol?: Partial<ColProps>;
  wrapperCol?: Partial<ColProps>;
  itemProps?: BasicFormItemProps;
  showAdvancedButton?: boolean;
  isAdvancedAction?: boolean;
  baseColProps?: Partial<ColProps>;
}
