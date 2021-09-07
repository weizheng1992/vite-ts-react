import React, { useMemo } from 'react';
import { Button } from 'antd';
import { BasicForm, FormProps } from '/@/components/Form';
import { BasicTable } from '/@/components/Table';
import { schemas, columns } from './data';
const Depat: React.FC = () => {
  const formProps: FormProps = useMemo(
    () => ({
      schemas: schemas,
      labelWidth: 100,
      baseColProps: { lg: 8, md: 24 },
      formActionProps: {
        actionColOpt: { span: 8 },
        colStyle: { textAlign: 'right' },
        resetButtonOptions: {
          text: '重置',
        },
        submitButtonOptions: {
          text: '确定',
        },
        advancedButtonOptions: { style: { fontSize: 12 } },
      },
    }),
    []
  );
  const handleEdit = () => {};
  const handleDel = () => {};
  return (
    <>
      <BasicForm {...formProps} />
      <div className="text-right mt-4 pr-4 pt-4 bg-white">
        <Button type="primary">新建</Button>
      </div>
      <BasicTable
        tableProps={{ pagination: false }}
        columns={columns}
        rowKey={'menuId'}
        actionProps={{ title: '操作', width: 200, fixed: 'right' }}
        actions={[
          {
            label: '',
            icon: 'clarity:note-edit-line',
            onClick: handleEdit,
          },
          {
            label: '',
            icon: 'ant-design:delete-outlined',
            color: 'error',
            popConfirm: { title: '是否删除？', confirm: handleDel },
          },
        ]}
      />
    </>
  );
};
export default Depat;
