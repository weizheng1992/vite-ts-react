import { FormSchema, FormActionType, BasicFormItemProps } from './form';
import type { ColEx } from './index';
export interface FormItemAllProps {
  formActionType: FormActionType;
  schema?: FormSchema;
  labelCol?: ColEx;
  itemProps?: BasicFormItemProps;
  showAdvancedButton?: boolean;
  isAdvancedAction?: boolean;
}
