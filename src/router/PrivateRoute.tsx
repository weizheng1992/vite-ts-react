import React from 'react';
import Auth from '/@/pages/sys/403';

const PrivateRoute = ({ children }) => {
  const logged = localStorage.getItem('token');
  if (!logged) {
    return <Auth />;
  } else {
    return children;
  }
};

export default PrivateRoute;
