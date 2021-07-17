import type { ReactNode } from 'react';
import type { NamePath } from 'antd/lib/form/interface';
import type { RuleObject, FormProps as BasicFormProps, FormItemProps } from 'antd/lib/form';
import type { ComponentType } from './index';
import type { ButtonProps } from 'antd/es/button/button';
import type { ColProps } from 'antd/lib/grid/col';

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};
export interface RenderCallbackParams {
  schema: FormSchema;
  field: string;
}
export interface FormSchema {
  // Field name
  field: string;
  // Event name triggered by internal value change, default change
  changeEvent?: string;
  // Label name
  label: string;
  // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
  labelWidth?: string | number;
  disabledLabelWidth?: boolean;
  // render component
  component: ComponentType;
  // Component parameters
  componentprops?:
    | ((opt: { schema: FormSchema; formActionType: FormActionType }) => Recordable)
    | object;
  renderComponentContent?: ((renderCallbackParams: RenderCallbackParams) => any) | string;

  // Validation rules
  rules?: Rule[];

  // col configuration outside formModelItem
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  colProps?: ColProps;
  // 默认值
  defaultValue?: any;
  isAdvanced?: boolean;

  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  // Render the content in the form-item tag
  render?: (renderCallbackParams: RenderCallbackParams) => ReactNode | ReactNode[] | string;

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[];
  valuePropName?: string;
}

export interface BasicFormItemProps extends FormItemProps {
  schema?: FormSchema;
}
export interface FormProps {
  resetFunc?: () => Promise<void>;
  submitFunc?: (value: any) => Promise<void>;
  schemas?: FormSchema[];
  formProps?: BasicFormProps;
  formItemProps?: BasicFormItemProps;
  formActionProps?: FormActionProps;
  showAdvancedButton?: boolean;
  actionSpan?: number;
  onRegister?: (form: FormActionType) => void;
  labelWidth?: number | string;
  labelCol?: Partial<ColProps>;
  wrapperCol?: Partial<ColProps>;
  baseColProps?: ColProps;
}

export type ButtonOptions = ButtonProps & { text?: string };
export interface FormActionProps {
  colStyle?: object;
  isAdvanced?: boolean;
  showResetButton?: boolean;
  showSubmitButton?: boolean;
  showAdvancedButton?: boolean;
  resetButtonOptions?: ButtonOptions;
  submitButtonOptions?: ButtonOptions;
  advancedButtonOptions?: object;
  actionColOpt?: ColProps;
  submitAction?: () => void;
  resetAction?: () => void;
  advancedAction?: () => void;
}

export interface FormActionType {
  submit: () => void;
  setFieldsValue: <T>(values: T) => any;
  resetFields: () => void;
  getFieldsValue: () => any;
  getFieldValue: (name: NamePath) => any;
  validateFields: (nameList?: NamePath[]) => void;
  scrollToField: (name: NamePath, options?: ScrollOptions) => void;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  removeSchemaByFiled: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void>;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
