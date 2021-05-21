import type { FromItemAllProps, FormSchema } from '../types/form';

import { useMemo } from 'react';
import { isNumber } from '/@/utils/is';

export function useItemLabelWidth(schemaItem: FormSchema, props: FromItemAllProps) {
  return useMemo(() => {
    const { labelCol = {}, wrapperCol = {} } = schemaItem.itemProps || {};
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
  }, [schemaItem, props]);
}
