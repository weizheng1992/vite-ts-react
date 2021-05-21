import { FormSchema, FormActionType, FromItemAllProps } from './form';
import { FormItemProps } from 'antd/lib/form';
import type { InferProps } from 'prop-types';
export interface FormItemPropsType extends FormItemProps {
  schema: InferProps<FormSchema>;
  formProps: InferProps<FromItemAllProps>;
  allDefaultValues?: Recordable;
  formModel: Recordable;
  setFormModel: (key: string, value: any) => void;
  formActionType: Partial<FormActionType>;
}
