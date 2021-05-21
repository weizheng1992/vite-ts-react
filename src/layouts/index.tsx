import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

import { MenuItem } from '/@/router/menu/type';

import LayoutHeader from './header';
import LayoutMenu from './menu';
import LayoutContent from './content';
import LayoutFooter from './footer';

import './index.less';

const LayoutPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/index');
    }
  }, [navigate, location]);
  const onCollapse = (): void => {
    setCollapsed(!collapsed);
  };
  const onMenuClick = (menu: MenuItem): void => {
    const { path } = menu;
    navigate(path);
  };
  return (
    <Layout style={{ minHeight: '100vh' }} className="layout-main">
      <LayoutMenu collapsed={collapsed} onMenuClick={onMenuClick} />
      <Layout className="site-layout">
        <LayoutHeader collapsed={collapsed} toggle={onCollapse} />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  );
};
export default LayoutPage;
