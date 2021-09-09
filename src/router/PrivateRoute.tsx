import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import Auth from '/@/pages/sys/403';

const PrivateRoute: FC<RouteProps> = (props) => {
  const logged = localStorage.getItem('token');
  return logged ? <Route {...props} /> : <Auth />;
};

export default PrivateRoute;
