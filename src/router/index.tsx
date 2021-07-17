/*
 * @Author: weizheng
 * @Date: 2021-07-05 10:43:15
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 17:03:41
 */
import React, { lazy, FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';
import WrapperRouteAuth from './RouteAuth';

import LayoutPage from '/@/layouts';
import Login from '../pages/sys/login';
const Home = lazy(() => import('/@/pages/Index'));
const Form = lazy(() => import('/@/pages/demo/form'));
const Table = lazy(() => import('../pages/demo/Table'));
const Menu = lazy(() => import('../pages/sys/menu'));
const NotFound = lazy(() => import('/@/pages/sys/404'));

const routeList: PartialRouteObject[] = [
  {
    path: 'login',
    element: <WrapperRouteAuth element={<Login />} title="登录" />,
  },
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { path: 'index', element: <WrapperRouteAuth element={<Home />} auth={true} title="首页" /> },
      {
        path: 'comp',
        children: [
          {
            path: 'form',
            element: <WrapperRouteAuth element={<Form />} auth={true} title="表单" />,
          },
          {
            path: 'table',
            element: <WrapperRouteAuth element={<Table />} auth={true} title="表格" />,
          },
        ],
      },
      {
        path: 'sys',
        children: [
          {
            path: 'menu',
            element: <WrapperRouteAuth element={<Menu />} auth={true} title="菜单管理" />,
          },
        ],
      },
      {
        path: '*',
        element: <WrapperRouteAuth element={<NotFound />} title="404" />,
      },
    ],
  },
];
const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
