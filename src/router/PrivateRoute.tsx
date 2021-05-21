import React, { FC } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { RouteProps, useLocation } from 'react-router';

const PrivateRoute: FC<RouteProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logged = localStorage.getItem('token');
  return logged ? (
    <Route {...props} />
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={'未登录'}
      extra={
        <Button
          type="primary"
          onClick={() =>
            navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })
          }
        >
          去登陆
        </Button>
      }
    />
  );
};

export default PrivateRoute;
