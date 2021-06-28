import React, { useCallback } from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/actions/user';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const LayoutHeader: React.FC<HeaderProps> = ({ collapsed, toggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMenu = useCallback(
    ({ key }: { key: any }) => {
      if (key === 'logout') {
        dispatch(logOut(() => navigate('/login')));
      }
    },
    [dispatch]
  );
  return (
    <Header className="site-layout-background layout-page-header px-2">
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
              <Menu onClick={handleMenu}>
                <Menu.Item key="info" style={{ textAlign: 'left' }}>
                  我的信息
                </Menu.Item>
                <Menu.Item key="logout" style={{ textAlign: 'left' }}>
                  退出
                </Menu.Item>
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
