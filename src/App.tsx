/*
 * @Author: weizheng
 * @Date: 2021-06-22 20:30:54
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-18 01:53:40
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import zhCN from 'antd/lib/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';
import RenderRouter from '../src/router';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN} componentSize="middle">
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}
export default App;
