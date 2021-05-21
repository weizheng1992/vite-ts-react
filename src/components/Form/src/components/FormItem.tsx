import React, { useMemo, memo } from 'react';
import type { FC } from 'react';
import { Form, Col } from 'antd';
import { componentMap } from '../componentMap';

import type { FromItemAllProps, FormSchema } from '../types/form';
import type { RuleObject } from 'antd/lib/form';

import { FormItemPropsType } from '../types/formItemProps';
import { isBoolean, isFunction } from '/@/utils/is';
import { createPlaceholderMessage, setComponentRuleType } from '../helper';
import { upperFirst, cloneDeep } from 'lodash-es';

import { useItemLabelWidth } from '../hooks/useItemLabelWidth';

const FormItem: React.FC<FormItemPropsType> = (props) => {
  const { schema, formProps } = props as { schema: FormSchema; formProps: FromItemAllProps };

  const itemLabelWidthProp = useItemLabelWidth(schema, formProps);
  const getValues = useMemo(() => {
    const { allDefaultValues, formModel, schema } = props;
    const { mergeDynamicData } = props.formProps;
    return {
      field: schema.field,
      model: formModel,
      values: {
        ...mergeDynamicData,
        ...allDefaultValues,
        ...formModel,
      } as Recordable,
      schema: schema,
    };
  }, [props]);
  const getComponentsProps = useMemo(() => {
    const { schema, formModel, formActionType } = props;
    const { componentProps = {} } = schema;
    if (!isFunction(componentProps)) {
      return componentProps;
    }
    return componentProps({ schema, formModel, formActionType }) ?? {};
  }, [props]);

  const getDisable = useMemo(() => {
    const { disabled: globDisabled } = props.formProps;
    const { dynamicDisabled } = props.schema;
    const { disabled: itemDisabled = false } = getComponentsProps;
    let disabled = !!globDisabled || itemDisabled;
    if (isBoolean(dynamicDisabled)) {
      disabled = dynamicDisabled;
    }

    if (isFunction(dynamicDisabled)) {
      disabled = dynamicDisabled(getValues);
    }
    return disabled;
  }, [props.formProps.disabled, props.schema.dynamicDisabled]);

  function getShow(): { isShow: boolean; isIfShow: boolean } {
    const { show, ifShow } = props.schema;
    const { showAdvancedButton } = props.formProps;
    const itemIsAdvanced = showAdvancedButton
      ? isBoolean(props.schema.isAdvanced)
        ? props.schema.isAdvanced
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
  }

  function handleRules(): RuleObject[] {
    const {
      rules: defRules = [],
      component,
      rulesMessageJoinLabel,
      label,
      dynamicRules,
      required,
    } = props.schema;

    if (isFunction(dynamicRules)) {
      return dynamicRules(getValues) as RuleObject[];
    }

    let rules: RuleObject[] = cloneDeep(defRules) as RuleObject[];

    if ((!rules || rules.length === 0) && required) {
      rules = [{ required, type: 'string' }];
    }

    const requiredRuleIndex: number = rules.findIndex(
      (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
    );
    const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.formProps;
    if (requiredRuleIndex !== -1) {
      const rule = rules[requiredRuleIndex];
      const { isShow } = getShow();
      if (!isShow) {
        rule.required = false;
      }
      if (component) {
        if (!Reflect.has(rule, 'type')) {
          rule.type = component === 'InputNumber' ? 'number' : 'string';
        }
        const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
          ? rulesMessageJoinLabel
          : globalRulesMessageJoinLabel;

        rule.message =
          rule.message || createPlaceholderMessage(component) + `${joinLabel ? label : ''}`;

        if (component.includes('Input') || component.includes('Textarea')) {
          rule.whitespace = true;
        }

        setComponentRuleType(rule, component);
      }
    }

    // Maximum input length rule check
    const characterInx = rules.findIndex((val) => val.max);
    if (characterInx !== -1 && !rules[characterInx].validator) {
      rules[characterInx].message = rules[characterInx].message;
    }
    return rules;
  }

  function renderComponent() {
    const {
      renderComponentContent,
      component,
      field,
      changeEvent = 'change',
      valueField,
    } = props.schema;

    const isCheck = component && ['Switch', 'Checkbox'].includes(component);

    const eventKey = `on${upperFirst(changeEvent)}`;
    const on = {
      [eventKey]: (e: Nullable<Recordable>) => {
        if (propsData[eventKey]) {
          propsData[eventKey](e);
        }
        const target = e ? e.target : null;

        const value = target ? (isCheck ? target.checked : target.value) : e;
        props.setFormModel(field, value);
      },
    };
    const Comp = componentMap.get(component) as FC;

    const { autoSetPlaceHolder = true, size } = props.formProps;
    const isInput = component && ['Input', 'InputNumber'].includes(component);
    const propsData: Recordable = {
      // getPopupContainer: (trigger: Element) => trigger.parentNode,
      size,
      ...getComponentsProps,
      disabled: getDisable,
    };
    if (isInput) {
      propsData.allowClear = true;
    }
    const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
    let placeholder;
    // RangePicker place is an array
    if (isCreatePlaceholder && component !== 'RangePicker' && component) {
      placeholder = getComponentsProps?.placeholder || createPlaceholderMessage(component);
    }
    propsData.placeholder = placeholder;
    propsData.codefield = field;
    propsData.formvalues = getValues;

    const bindValue: Recordable = {
      [valueField || (isCheck ? 'checked' : 'value')]: props.formModel[field],
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
  }

  const renderLabelHelpMessage = () => {
    const { label, subLabel } = props.schema;
    const renderLabel = subLabel ? (
      <span>
        {label} <span style={{ color: '#00000073' }}>{subLabel}</span>
      </span>
    ) : (
      label
    );
    return renderLabel;
    // if (!helpMessage || (Array.isArray(helpMessage) && helpMessage.length === 0)) {
    //   return renderLabel;
    // }
    // return (
    //   <span>
    //     {renderLabel}
    //     <BasicHelp placement="top" class="mx-1" text={helpMessage} {...helpComponentProps} />
    //   </span>
    // );
  };
  const renderItem = () => {
    const { itemProps, render, field, suffix, defaultValue, valuePropName } = props.schema;
    const { labelCol, wrapperCol } = itemLabelWidthProp;
    const { colon } = props.formProps;
    const getComp = () => {
      return render ? render(getValues) : renderComponent();
    };

    const showSuffix = !!suffix;
    const getSuffix = isFunction(suffix) ? suffix(getValues) : suffix;
    if (showSuffix) {
      return (
        <Form.Item
          colon={colon}
          className={showSuffix ? 'suffix-item' : ''}
          label={renderLabelHelpMessage()}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          <Form.Item
            name={field}
            noStyle
            {...(itemProps as Recordable)}
            rules={handleRules()}
            initialValue={defaultValue}
            valuePropName={valuePropName}
          >
            {getComp()}
          </Form.Item>
          <span className="suffix">{getSuffix}</span>
        </Form.Item>
      );
    }
    return (
      <Form.Item
        name={field}
        colon={colon}
        className={showSuffix ? 'suffix-item' : ''}
        {...(itemProps as Recordable)}
        label={renderLabelHelpMessage()}
        rules={handleRules()}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        initialValue={defaultValue}
        valuePropName={valuePropName}
      >
        {getComp()}
      </Form.Item>
    );
  };
  console.log('KKKKKKKKKK');
  const getContent = () => {
    const { renderColContent } = props.schema;
    return renderColContent ? renderColContent(getValues) : renderItem();
  };

  const { colProps = {} } = props.schema;
  const { baseColProps = {} } = props.formProps;

  const realColProps = { ...baseColProps, ...colProps };
  const { isIfShow, isShow } = getShow();
  if (!isIfShow && !isShow) {
    return <div></div>;
  }
  return (
    <Col {...realColProps}>
      {getContent()}
      {/* {showSuffix && <span className="suffix">{getSuffix}</span>} */}
    </Col>
  );
};

export default memo(FormItem);
