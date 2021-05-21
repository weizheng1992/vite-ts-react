import React, { lazy, FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';
import WrapperRouteAuth from './RouteAuth';

import LayoutPage from '/@/layouts';
import Login from '/@/pages/login';
const Index = lazy(() => import('/@/pages/Index'));
const About = lazy(() => import('/@/pages/About'));

const routeList: PartialRouteObject[] = [
  {
    path: 'login',
    element: <WrapperRouteAuth element={<Login />} title="登录" />,
  },
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { path: 'index', element: <WrapperRouteAuth element={<Index />} title="首页"  /> },
      { path: 'about/index', element: <WrapperRouteAuth element={<About />} title="我的" /> },
    ],
  },
];
const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
