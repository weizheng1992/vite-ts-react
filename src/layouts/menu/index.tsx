import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { MenuItem } from '/@/router/menu/type';
import { useNavigate, useLocation } from 'react-router-dom';

import { staticMenus } from '/@/router/menu';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface Props {
  collapsed: boolean;
  onMenuClick: (menu: MenuItem) => void;
}

const LayoutMenu: React.FC<Props> = ({ collapsed }) => {
  const [openKeys, setOpenkeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenkeys(['/' + pathname.split('/')[1]]);
  }, [pathname]);

  const onMenuClick = (menu: MenuItem) => {
    const { path } = menu;
    if (path === pathname) return;
    setSelectedKeys([path]);
    navigate(path);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    setOpenkeys(key ? [key] : []);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        {staticMenus?.map((menu) =>
          menu.children && menu.children.length > 0 ? (
            <SubMenu key={menu.path} title={menu.name}>
              {menu.children.map((child) => (
                <Menu.Item key={child.path} onClick={() => onMenuClick(child)}>
                  {child.name}
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={menu.path} onClick={() => onMenuClick(menu)}>
              {menu.name}
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};
export default LayoutMenu;
