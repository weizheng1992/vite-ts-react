/*
 * @Author: zz
 * @Date: 2021-06-28 17:22:48
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-02 18:28:05
 */
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
    submitAction,
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
          <Button type="default" className="mr-2" onClick={resetAction} {...resetButtonOptions}>
            {resetButtonOptions && resetButtonOptions.text}
          </Button>
        )}
        {showSubmitButton && (
          <Button type="primary" className="mr-2" onClick={submitAction} {...submitButtonOptions}>
            {submitButtonOptions && submitButtonOptions.text}
          </Button>
        )}
        {showAdvancedButton && renderAdvancedButton()}
      </Form.Item>
    </Col>
  );
};
export default FormAction;
