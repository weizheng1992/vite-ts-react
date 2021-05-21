import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import SuspendFallbackLoading from './components/SuspendFallbackLoading';
import Breadrumb from './components/Breadrumb';

import { Layout } from 'antd';
const { Content } = Layout;

const LayoutContent: React.FC = () => {
  return (
    <Content className="site-layout" style={{ padding: '0 30px' }}>
      <Breadrumb />
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Suspense
          fallback={
            <SuspendFallbackLoading
              message="Alert message title"
              description="Further details about the context of this alert."
            />
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </Content>
  );
};

export default LayoutContent;
