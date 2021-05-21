import type { ElementRef } from 'react';
import type { ComponentType } from './types/index';

/**
 * Component list, register here to setting it in the form
 */
import {
  Input,
  Select,
  Radio,
  Checkbox,
  AutoComplete,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TimePicker,
  TreeSelect,
} from 'antd';

// import RadioButtonGroup from './components/RadioButtonGroup.vue';
// import ApiSelect from './components/ApiSelect.vue';
// import { BasicUpload } from '/@/components/Upload';
// import { StrengthMeter } from '/@/components/StrengthMeter';
// import { IconPicker } from '/@/components/Icon';
// import { CountdownInput } from '/@/components/CountDown';

const componentMap = new Map<ComponentType, ElementRef<any>>();

componentMap.set('Input', Input);
componentMap.set('InputGroup', Input.Group);
componentMap.set('InputPassword', Input.Password);
componentMap.set('InputSearch', Input.Search);
componentMap.set('InputTextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
componentMap.set('AutoComplete', AutoComplete);

componentMap.set('Select', Select);
// componentMap.set('ApiSelect', ApiSelect);
componentMap.set('TreeSelect', TreeSelect);
componentMap.set('Switch', Switch);
// componentMap.set('RadioButtonGroup', RadioButtonGroup);
componentMap.set('RadioGroup', Radio.Group);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', Checkbox.Group);
componentMap.set('Cascader', Cascader);

componentMap.set('DatePicker', DatePicker);
componentMap.set('MonthPicker', DatePicker.MonthPicker);
componentMap.set('RangePicker', DatePicker.RangePicker);
componentMap.set('WeekPicker', DatePicker.WeekPicker);
componentMap.set('TimePicker', TimePicker);
// componentMap.set('StrengthMeter', StrengthMeter);
// componentMap.set('IconPicker', IconPicker);
// componentMap.set('InputCountDown', CountdownInput);

// componentMap.set('Upload', BasicUpload);F

export function add(compName: ComponentType, component: ElementRef<any>) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
