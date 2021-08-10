import type { ReactNode } from 'react';

export interface ActionItem {
  onClick?: Fn;
  label: string;
  icon?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((record: any) => boolean);
}

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: ReactNode;
}
