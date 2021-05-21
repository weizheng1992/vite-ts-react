import React from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const LayoutHeader: React.FC<HeaderProps> = ({ collapsed, toggle }) => {
  return (
    <Header
      className="site-layout-background layout-page-header px-2"
    >
      <div className="flex justify-between">
        <div onClick={toggle}>
          <span id="sidebar-trigger">
            {collapsed ? (
              <MenuUnfoldOutlined className="header-trigger" />
            ) : (
              <MenuFoldOutlined className="header-trigger" />
            )}
          </span>
        </div>
        <div className="">
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item style={{ textAlign: 'left' }}>简体中文</Menu.Item>
                <Menu.Item style={{ textAlign: 'left' }}>English</Menu.Item>
              </Menu>
            }
          >
            <span className="drop-title">姓名</span>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default LayoutHeader;
