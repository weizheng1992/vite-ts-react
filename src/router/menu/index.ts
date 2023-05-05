import type { MenuProps } from 'antd';
import { MenuList, MenuModule, MenuItem } from './type';
import { isUrl } from '/@/utils/is';

type AntdMenuItem = Required<MenuProps>['items'][number];
const modules: any = import.meta.globEager('./modules/**/*.ts');

const menuModules: MenuModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  menuModules.push(...modList);
});
menuModules.sort((a, b) => {
  return (a.orderNo || 0) - (b.orderNo || 0);
});

const staticMenus: MenuList = [];
const antdMenu: MenuProps['items'] = [];
(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0);
  });

  for (const menu of menuModules) {
    staticMenus.push(transformMenuModule(menu));
  }

  for (const menu of staticMenus) {
    if (menu.children && menu.children.length > 0) {
      const child: MenuItem[] = menu.children;

      const childArr: MenuProps['items'] = [];
      for (const c of child) {
        childArr.push(getItem(c.name, c.path, null));
      }

      antdMenu.push(getItem(menu.name, menu.path, null, childArr));
    } else {
      antdMenu.push(getItem(menu.name, menu.path, null));
    }
  }
})();

export { menuModules, staticMenus, antdMenu };

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: AntdMenuItem[]
): AntdMenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as AntdMenuItem;
}

function transformMenuModule(menuModule: MenuModule): MenuItem {
  const { menu } = menuModule;

  const menuList = [menu];

  joinParentPath(menuList);
  return menuList[0];
}

function joinParentPath(menus: MenuList, parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path);
    }
  }
}
