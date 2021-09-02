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
import { upperFirst } from 'lodash-es';
import { createPlaceholderMessage } from '../helper';

const FormItem: React.FC<FormItemAllProps> = (props) => {
  const schema = props.schema as FormSchema;

  const itemLabelWidthProp = useItemLabelWidth(schema, props);

  const getValues = useMemo(() => {
    const { allDefaultValues, formModel = {}, schema = {} as FormSchema } = props;
    return {
      field: schema.field,
      model: formModel,
      values: {
        ...allDefaultValues,
        ...formModel,
      } as Recordable,
      schema: schema,
    };
  }, [props.allDefaultValues, props.formModel, props.schema]);

  const getComponentsProps = useMemo(() => {
    const { formActionType, formModel = {} } = props;
    const { componentprops = {} } = schema;
    if (!isFunction(componentprops)) {
      return componentprops;
    }
    return componentprops({ schema, formModel, formActionType }) ?? {};
  }, [props.formActionType, props.formModel, schema]);

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
      isShow = show(getValues);
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(getValues);
    }
    isShow = isShow && itemIsAdvanced;
    return { isShow, isIfShow };
  }, [schema, props.isAdvancedAction, getValues]);
  const renderComponent = () => {
    const { setFormModel = () => {}, formModel = {} } = props;
    const {
      component,
      renderComponentContent,
      field,
      changeEvent = 'change',
      valuePropName,
    } = schema;

    const isCheck = component && ['Switch', 'Checkbox', 'CheckboxGroup'].includes(component);

    const eventKey = `on${upperFirst(changeEvent)}`;

    const on = {
      [eventKey]: (...args: Nullable<Recordable>[]) => {
        const [e] = args;
        if (propsData[eventKey]) {
          propsData[eventKey](...args);
        }
        const target = e ? e.target : null;
        const value = target ? (isCheck ? target.checked : target.value) : e;
        setFormModel(field, value);
      },
    };
    const Comp = componentMap.get(component) as React.FC;

    const { autoSetPlaceHolder, size } = props;
    const propsData: Recordable = {
      allowClear: true,
      getPopupContainer: (trigger: Element) => trigger.parentNode,
      size,
      ...getComponentsProps,
    };

    const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
    // RangePicker place is an array
    if (isCreatePlaceholder && component !== 'RangePicker' && component) {
      propsData.placeholder =
        getComponentsProps?.placeholder || createPlaceholderMessage(component);
    }
    propsData.codeField = field;
    propsData.formValues = getValues;

    const bindValue: Recordable = {
      [valuePropName || (isCheck ? 'checked' : 'value')]: formModel[field],
    };
    const compAttr: Recordable = {
      ...propsData,
      ...on,
      ...bindValue,
    };
    if (!renderComponentContent) {
      return <Comp {...compAttr} />;
    }
    const compSlot = isFunction(renderComponentContent)
      ? { ...renderComponentContent(getValues) }
      : renderComponentContent;
    return <Comp {...compAttr}>{compSlot}</Comp>;
  };
  const getComp = () => {
    const { render } = schema;
    return render ? render(getValues) : renderComponent();
  };

  const renderItem = () => {
    const { labelCol, wrapperCol } = itemLabelWidthProp;
    const { render, label, field, rules } = schema;
    if (render) {
      return (
        <Form.Item
          {...props.itemProps}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          rules={rules}
          // valuePropName={valuePropName}
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
        rules={rules}
        // valuePropName={valuePropName}
        label={label}
      >
        {getComp()}
      </Form.Item>
    );
  };
  const { baseColProps } = props;
  const { colProps } = schema;
  const realColProps = { ...baseColProps, ...colProps };
  return (
    <Col {...realColProps} style={{ display: getShow.isShow ? '' : 'none' }}>
      {renderItem()}
    </Col>
  );
};
export default FormItem;
