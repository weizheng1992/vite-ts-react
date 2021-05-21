
import type { ColEx } from '../types/index';
import type { ButtonProps } from 'antd/es/button/button';


export type ButtonOptions = ButtonProps & { text?: string };
export interface FormActionProps {
  showActionButtonGroup?: boolean;
  showResetButton?: boolean;
  showSubmitButton?: boolean;
  showAdvancedButton?: boolean;
  resetButtonOptions?: ButtonOptions;
  submitButtonOptions?: ButtonOptions;
  actionColOptions?: ColEx;
  actionSpan?: number;
  isAdvanced?: boolean;
  hideAdvanceBtn?: boolean;
  submitAction?: () => void;
  resetAction?: () => void;
}
