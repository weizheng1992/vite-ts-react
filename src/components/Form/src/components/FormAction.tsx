import React from 'react';
import { Col, Form, Button } from 'antd';
import { FormActionProps } from '../types/form';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const FormAction: React.FC<FormActionProps> = (props) => {
  const {
    resetAction,
    resetButtonOptions,
    submitButtonOptions,
    actionColOpt,
    colStyle = { textAlign: 'rigth' },
    showResetButton = true,
    showSubmitButton = true,
    showAdvancedButton = false,
    isAdvanced,
    advancedAction,
    advancedButtonOptions,
  } = props;
  const renderAdvancedButton = () => {
    return (
      <Button type="link" size="small" onClick={advancedAction} {...advancedButtonOptions}>
        {isAdvanced ? <UpOutlined /> : <DownOutlined />}
        {isAdvanced ? '收起' : '打开'}
      </Button>
    );
  };
  console.log('Form.Action');
  return (
    <Col {...actionColOpt} style={colStyle}>
      <Form.Item>
        {showResetButton && (
          <Button type="default" className="mr-2" {...resetButtonOptions} onClick={resetAction}>
            {resetButtonOptions && resetButtonOptions.text}
          </Button>
        )}
        {showSubmitButton && (
          <Button type="primary" className="mr-2" htmlType="submit" {...submitButtonOptions}>
            {submitButtonOptions && submitButtonOptions.text}
          </Button>
        )}
        {showAdvancedButton && renderAdvancedButton()}
      </Form.Item>
    </Col>
  );
};
export default FormAction;
