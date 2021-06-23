import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={'找不到页面啊！'}
      extra={
        <Button type="primary" onClick={() => navigate('/index')}>
          去首页
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
