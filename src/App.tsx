import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';
import RenderRouter from '../src/router';

import 'moment/locale/zh-cn';
function App() {
  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </ConfigProvider>
  );
}
export default App;
