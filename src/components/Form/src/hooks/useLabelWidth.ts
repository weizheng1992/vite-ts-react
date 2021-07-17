/*
 * @Author: weizheng
 * @Date: 2021-07-17 18:41:30
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 19:04:22
 */
import type { FormSchema } from '../types/form';
import { FormItemAllProps } from '../types/formItem';
import { isNumber } from '/@/utils/is';

export function useItemLabelWidth(schemaItem: FormSchema, props: FormItemAllProps) {
  const { labelCol = {}, wrapperCol = {} } = schemaItem || {};
  const { labelWidth, disabledLabelWidth } = schemaItem;

  const {
    labelWidth: globalLabelWidth,
    labelCol: globalLabelCol,
    wrapperCol: globWrapperCol,
  } = props;

  // If labelWidth is set globally, all items setting
  if ((!globalLabelWidth && !labelWidth && !globalLabelCol) || disabledLabelWidth) {
    labelCol.style = {
      textAlign: 'left',
    };
    return { labelCol, wrapperCol };
  }
  let width = labelWidth || globalLabelWidth;
  const col = { ...globalLabelCol, ...labelCol };
  const wrapCol = { ...globWrapperCol, ...wrapperCol };

  if (width) {
    width = isNumber(width) ? `${width}px` : width;
  }

  return {
    labelCol: { style: { width }, ...col },
    wrapperCol: { style: { width: `calc(100% - ${width})` }, ...wrapCol },
  };
}
