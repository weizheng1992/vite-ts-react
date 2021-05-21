import React, { useMemo, memo } from 'react';

import { Form, Col, Button } from 'antd';
import type { ColEx } from '../types/index';
import { ButtonOptions, FormActionProps } from '../types/formActionProps';

const FormAction: React.FC<FormActionProps> = (props) => {
  const actionColOpt = useMemo(() => {
    const { showAdvancedButton = false, actionSpan: span = 6, actionColOptions } = props;
    const actionSpan = 24 - span;
    const advancedSpanObj = showAdvancedButton ? { span: actionSpan < 6 ? 24 : actionSpan } : {};
    const actionColOpt: Partial<ColEx> = {
      span: showAdvancedButton ? 6 : 4,
      ...advancedSpanObj,
      ...actionColOptions,
    };
    return actionColOpt;
  }, [props]);

  const getResetBtnOptions = useMemo((): ButtonOptions => {
    return Object.assign(
      {
        text: '重置',
      },
      props.resetButtonOptions
    );
  }, [props.resetButtonOptions]);

  const getSubmitBtnOptions = useMemo((): ButtonOptions => {
    return Object.assign(
      {
        text: '提交',
      },
      props.submitButtonOptions
    );
  }, [props.submitButtonOptions]);
  console.log('999999999', getResetBtnOptions);
  const { showResetButton = true, showSubmitButton = true, resetAction, submitAction } = props;
  return (
    <Col {...actionColOpt} style={{ textAlign: 'right' }}>
      <Form.Item>
        {showResetButton && (
          <Button type="default" className="mr-2" {...getResetBtnOptions} onClick={resetAction}>
            {getResetBtnOptions.text}
          </Button>
        )}
        {showSubmitButton && (
          <Button
            type="primary"
            className="mr-2"
            htmlType="submit"
            {...getSubmitBtnOptions}
            onClick={submitAction}
          >
            {getSubmitBtnOptions.text}
          </Button>
        )}
      </Form.Item>
    </Col>
  );
};

export default memo(FormAction);
