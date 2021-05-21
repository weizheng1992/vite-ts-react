export interface MenuItem {
  /** menu item name */
  name: string;
  /** 图标名称
   *
   * 子子菜单不需要图标
   */
  icon?: string;
  /** 菜单id */
  key?: string;
  /** 菜单路由 */
  path: string;
  /** 子菜单 */
  children?: MenuItem[];
  /**面包屑名字 */
  breadcrumbName:string;
}
export interface MenuModule {
  orderNo?: number;
  menu: MenuItem;
}
export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];