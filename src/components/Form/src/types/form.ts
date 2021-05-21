import type { ReactNode, CSSProperties } from 'react';
import type { NamePath } from 'antd/lib/form/interface';
import type { RuleObject, FormProps as BasicFormProps } from 'antd/lib/form';
import type { ButtonProps as AntdButtonProps } from 'antd/es/button/button';

import type { FormItem } from './formItem';
import { FormActionProps } from './formActionProps';
import type { ColEx, ComponentType } from './index';

export type FieldMapToTime = [string, [string, string], string?][];

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  field: string;
}

export interface ButtonProps extends AntdButtonProps {
  text?: string;
}

export interface FormActionType {
  submit: () => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  resetFields: () => Promise<void>;
  getFieldsValue: () => Recordable;
  clearValidate: (name?: string | string[]) => Promise<void>;
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  removeSchemaByFiled: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void>;
  validateFields: (nameList?: NamePath[]) => Promise<any>;
  validate: (nameList?: NamePath[]) => Promise<any>;
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
export type FromItemAllProps = {
  // General col configuration
  baseColProps?: Partial<ColEx>;
  // The width of all items in the entire form
  labelWidth?: number | string;
  // Col configuration for the entire form
  labelCol?: Partial<ColEx>;
  // Col configuration for the entire form
  wrapperCol?: Partial<ColEx>;

  // Function values used to merge into dynamic control form items
  mergeDynamicData?: Recordable;

  // Whether to disable
  disabled?: boolean;

  // Placeholder is set automatically
  autoSetPlaceHolder?: boolean;
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean;

  colon?: boolean;
  // Whether to show collapse and expand buttons
  showAdvancedButton?: boolean;

  // Internal component size of the form
  size?: 'default' | 'small' | 'large';
} & FormItem;

export interface FormProps {
  // Submit form on reset
  submitOnReset?: boolean;
  // Blank line span
  emptySpan?: number | Partial<ColEx>;
  resetFunc?: () => Promise<void>;
  submitFunc?: (value: any) => Promise<void>;
  schemas?: FormSchema[];

  // Whether to focus on the first input box, only works when the first form item is input
  autoFocusFirstItem?: boolean;

  transformDateFunc?: (date: any) => string;

  // Time interval fields are mapped into multiple
  fieldMapToTime?: FieldMapToTime;
  // General row style
  baseRowStyle?: CSSProperties;

  // Compact mode for search forms
  compact?: boolean;
  fref?: any;
  formProps?: BasicFormProps;
  formItemProps?: FromItemAllProps;
  formActionProps?: FormActionProps;
  //  {
  //   // Whether to show collapse and expand buttons
  //   showAdvancedButton?: boolean;

  //   // Automatically collapse over the specified number of rows
  //   autoAdvancedLine?: number;

  //   // Whether to show the operation button
  //   showActionButtonGroup?: boolean;

  //   // Reset button configuration
  //   resetButtonOptions?: Partial<ButtonProps>;

  //   // Confirm button configuration
  //   submitButtonOptions?: Partial<ButtonProps>;

  //   // Operation column configuration
  //   actionColOptions?: Partial<ColEx>;

  //   // Show reset button
  //   showResetButton?: boolean;
  //   // Show confirmation button
  //   showSubmitButton?: boolean;
  // };
  onRegister?: (funcs: Partial<FormActionType>) => void;
}
export interface FormSchema {
  // Field name
  field: string;
  // Event name triggered by internal value change, default change
  changeEvent?: string;
  // Variable name bound to v-model Default value
  valueField?: string;
  // Label name
  label: string;
  // Auxiliary text
  subLabel?: string;
  // Help text on the right side of the text
  helpMessage?: string | string[];
  // BaseHelp component props
  helpComponentProps?: Partial<HelpComponentProps>;
  // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
  labelWidth?: string | number;
  // Disable the adjustment of labelWidth with global settings of formModel, and manually set labelCol and wrapperCol by yourself
  disabledLabelWidth?: boolean;
  // render component
  component: ComponentType;
  // Component parameters
  componentProps?:
    | ((opt: {
        schema: FormSchema;
        // tableAction: TableActionType;
        formActionType: FormActionType;
        formModel: Recordable;
      }) => Recordable)
    | object;
  // Required
  required?: boolean;

  suffix?: string | number | ((values: RenderCallbackParams) => string | number);

  // Validation rules
  rules?: Rule[];
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean;

  // Reference formModelItem
  itemProps?: Partial<FormItem>;

  // col configuration outside formModelItem
  colProps?: Partial<ColEx>;

  // 默认值
  defaultValue?: any;
  isAdvanced?: boolean;

  // Matching details components
  span?: number;

  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  // Render the content in the form-item tag
  render?: (renderCallbackParams: RenderCallbackParams) => ReactNode | ReactNode[] | string;

  // Rendering col content requires outer wrapper form-item
  renderColContent?: (
    renderCallbackParams: RenderCallbackParams
  ) => ReactNode | ReactNode[] | string;

  renderComponentContent?:
    | ((renderCallbackParams: RenderCallbackParams) => any)
    | ReactNode
    | ReactNode[]
    | string;

  // Custom slot, in from-item
  slot?: string;

  // Custom slot, similar to renderColContent
  colSlot?: string;

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[];
  valuePropName?: string;
}
export interface HelpComponentProps {
  maxWidth: string;
  // Whether to display the serial number
  showIndex: boolean;
  // Text list
  text: any;
  // colour
  color: string;
  // font size
  fontSize: string;
  icon: string;
  absolute: boolean;
  // Positioning
  position: any;
}
