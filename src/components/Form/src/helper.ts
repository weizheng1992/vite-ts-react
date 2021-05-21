import type { RuleObject } from 'antd/lib/form';
import type { ComponentType } from './types/index';
// import { useI18n } from '/@/hooks/web/useI18n';
import { isNumber } from '/@/utils/is';

// const { t } = useI18n();

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input') || component.includes('Complete')) {
    return '请输入';
  }
  if (component.includes('Picker')) {
    return '请选择';
  }
  if (
    component.includes('Select') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    // return `请选择${label}`;
    return '请选择';
  }
  return '';
}

function genType() {
  return ['DatePicker', 'MonthPicker', 'RangePicker', 'WeekPicker', 'TimePicker'];
}

export function setComponentRuleType(rule: RuleObject, component: ComponentType) {
  if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
    rule.type = 'object';
  } else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
    rule.type = 'array';
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number';
  } else if (['Checkbox'].includes(component)) {
    rule.type = 'boolean';
  }
}

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val;
  if (['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(component)) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}

/**
 * 时间字段
 */
export const dateItemType = genType();
