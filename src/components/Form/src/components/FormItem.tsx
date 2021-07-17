/*
 * @Author: weizheng
 * @Date: 2021-05-19 18:31:04
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 19:11:05
 */
import React, { useMemo } from 'react';
import { Form, Col } from 'antd';
import { FormSchema } from '../types/form';
import { FormItemAllProps } from '../types/formItem';
import { componentMap } from '../componentMap';
import { useItemLabelWidth } from '../hooks/useLabelWidth';
import { isFunction, isBoolean } from '/@/utils/is';

const FormItem: React.FC<FormItemAllProps> = (props) => {
  const schema = props.schema as FormSchema;
  const {
    field,
    component,
    componentprops,
    renderComponentContent,
    render,
    valuePropName,
    label,
    colProps = {},
  } = schema;
  const itemLabelWidthProp = useItemLabelWidth(schema, props);
  const getComponentsProps = () => {
    const { formActionType } = props;
    if (!isFunction(componentprops)) {
      return componentprops;
    }
    return componentprops({ schema, formActionType }) || {};
  };

  const getShow = useMemo(() => {
    const { show, ifShow, isAdvanced } = schema;
    const { showAdvancedButton, isAdvancedAction } = props;
    const itemIsAdvanced: boolean = showAdvancedButton
      ? !isAdvancedAction
        ? !isAdvanced
        : true
      : true;

    let isShow = true;
    let isIfShow = true;

    if (isBoolean(show)) {
      isShow = show;
    }
    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(show)) {
      isShow = show({ schema, field });
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow({ schema, field });
    }
    isShow = isShow && itemIsAdvanced;
    return { isShow, isIfShow };
  }, [schema, props.isAdvancedAction]);
  const renderComponent = () => {
    const Comp = componentMap.get(component) as React.FC;
    if (!renderComponentContent) {
      return <Comp {...getComponentsProps()} />;
    }
    const compSlot = isFunction(renderComponentContent)
      ? { ...renderComponentContent({ schema, field }) }
      : renderComponentContent;
    return <Comp {...getComponentsProps()}>{compSlot}</Comp>;
  };
  const getComp = () => {
    return render ? render({ schema, field }) : renderComponent();
  };

  const renderItem = () => {
    const { labelCol, wrapperCol } = itemLabelWidthProp;
    if (render) {
      return (
        <Form.Item
          {...props.itemProps}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          valuePropName={valuePropName}
          label={label}
        >
          {getComp()}
        </Form.Item>
      );
    }
    return (
      <Form.Item
        name={field}
        {...props.itemProps}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        valuePropName={valuePropName}
        label={label}
      >
        {getComp()}
      </Form.Item>
    );
  };
  const { baseColProps } = props;
  const realColProps = { ...baseColProps, ...colProps };
  return (
    <Col {...realColProps} style={{ display: getShow.isShow ? '' : 'none' }}>
      {renderItem()}
    </Col>
  );
};
export default FormItem;
