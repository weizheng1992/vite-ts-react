import { useEffect, useRef, useState } from 'react';

import { error } from '/@/utils/log';

import type { FormProps, FormActionType, UseFormReturnType, FormSchema } from '../types/form';
import type { NamePath } from 'antd/lib/form/interface';

export declare type ValidateFields = (nameList?: NamePath[]) => Promise<Recordable>;

export function useForm(props: FormProps): UseFormReturnType {
  const formRef = useRef<Nullable<FormActionType>>(null);
  const [load, setload] = useState<boolean>(false);

  async function getForm() {
    const form = formRef.current;
    if (!form) {
      error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      );
    }
    return form as FormActionType;
  }
  useEffect(() => {
    return () => {
      formRef.current = null;
      setload(false);
    };
  }, []);
  function register(instance: FormActionType) {
    // console.log('sssss', props);
    // formRef.current = instance;
    // useEffect(() => {
    //   return () => {
    //     formRef.current = null;
    //     setload(false);
    //   };
    // }, []);
    if (load && instance === formRef.current) return;
    formRef.current = instance;
    setload(true);

    instance.setProps(props);
    // useEffect(() => {
    //   console.log('ssss44444',props);
    //   props && instance.setProps(props);
    // }, [props]);
  }
  const methods: FormActionType = {
      scrollToField: async (name: NamePath, options?: ScrollOptions | undefined) => {
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
      // resetSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      //   const form = await getForm();
      //   form.resetSchema(data);
      // },
      clearValidate: async (name?: string | string[]) => {
        const form = await getForm();
        form.clearValidate(name);
      },
      resetFields: async () => {
        getForm().then(async (form) => {
          await form.resetFields();
        });
      },
      removeSchemaByFiled: async (field: string | string[]) => {
        formRef?.current?.removeSchemaByFiled(field);
      },
      // TODO promisify
      getFieldsValue: <T>() => {
        return formRef?.current?.getFieldsValue() as T;
      },
      setFieldsValue: async <T>(values: T) => {
        const form = await getForm();
        form.setFieldsValue<T>(values);
      },
      appendSchemaByField: async (
        schema: FormSchema,
        prefixField: string | undefined,
        first: boolean
      ) => {
        const form = await getForm();
        form.appendSchemaByField(schema, prefixField, first);
      },
      submit: async (): Promise<any> => {
        const form = await getForm();
        return form.submit();
      },
      validate: async (nameList?: NamePath[]): Promise<Recordable> => {
        const form = await getForm();
        return form.validate(nameList);
      },
      validateFields: async (nameList?: NamePath[]): Promise<Recordable> => {
        const form = await getForm();
        return form.validateFields(nameList);
      },
  };
  return [register, methods];
}
