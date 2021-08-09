/*
 * @Author: weizheng
 * @Date: 2021-07-17 16:54:03
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 19:05:38
 */

import { ColumnsType } from 'antd/es/table';
import { FormSchema } from '/@/components/Form';
export const cloumns: ColumnsType<Recordable> = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 100,
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    width: 300,
  },
  {
    title: '组件',
    dataIndex: 'url',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
  },
];

const isDir = (type: number) => type === 0;
const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioGroup',
    defaultValue: '0',
    valuePropName: 'check',
    componentprops: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
  },

  // {
  //   field: 'parentMenu',
  //   label: '上级菜单',
  //   component: 'TreeSelect',
  //   componentprops: {
  //     treeDataSimpleMode: {
  //       title: 'menuName',
  //       key: 'id',
  //       value: 'id',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  // },

  {
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
  },
  {
    field: 'icon',
    label: '图标',
    component: 'Input',
    show: ({ values }) => !isButton(values.type),
  },

  {
    field: 'url',
    label: '路由地址',
    component: 'Input',
    show: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    show: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    show: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: 0,
    valuePropName: 'check',
    componentprops: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: '启用', value: 0 },
        { label: '禁用', value: 1 },
      ],
    },
  },
  {
    field: 'isExt',
    label: '是否外链',
    component: 'RadioGroup',
    defaultValue: '0',
    componentprops: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
  },

  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioGroup',
    defaultValue: '0',
    componentprops: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
  },

  {
    field: 'show',
    label: '是否显示',
    component: 'RadioGroup',
    defaultValue: '0',
    componentprops: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
  },
];
