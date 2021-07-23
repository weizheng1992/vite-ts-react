import { useRef } from 'react';
import { FormActionType, UseFormReturnType, FormProps, FormSchema } from '../types/form';
// import type { FormInstance } from 'antd/lib/form';
import type { NamePath } from 'antd/lib/form/interface';

export declare type ValidateFields = (nameList?: NamePath[]) => Promise<Recordable>;
export const useForm = (): UseFormReturnType => {
  const formRef = useRef<any>();
  function register(form: FormActionType): void {
    if (!formRef.current) {
      if (form) {
        formRef.current = form;
      }
    }
  }
  async function getForm() {
    const form = formRef.current;
    if (!form) {
      console.log(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      );
    }
    return form as FormActionType;
  }

  const methods: FormActionType = {
    setFieldsValue: async (values: any): Promise<void> => {
      const form = await getForm();
      form.setFieldsValue(values);
    },
    submit: async (): Promise<void> => {
      const form = await getForm();
      form.submit();
    },
    resetFields: async () => {
      const form = await getForm();
      form.resetFields();
    },
    getFieldValue: async (name: NamePath) => {
      const form = await getForm();
      return form.getFieldValue(name);
    },
    getFieldsValue: async () => {
      const form = await getForm();
      return form.getFieldsValue();
    },
    validateFields: async () => {
      const form = await getForm();
      return form.validateFields();
    },
    scrollToField: async (name: NamePath, options: ScrollOptions) => {
      const form = await getForm();
      form.scrollToField(name, options);
    },
    setProps: async (formProps: Partial<FormProps>) => {
      const form = await getForm();
      form.setProps(formProps);
    },
    updateSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      form.updateSchema(data);
    },
    removeSchemaByFiled: async (field: string | string[]) => {
      const form = await getForm();
      form.removeSchemaByFiled(field);
    },
    appendSchemaByField: async (
      schema: FormSchema,
      prefixField: string | undefined,
      first: boolean
    ) => {
      const form = await getForm();
      form.appendSchemaByField(schema, prefixField, first);
    },
  };
  return [register, methods];
};
