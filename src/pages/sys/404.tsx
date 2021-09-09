import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFound from '/@/assets/svg/404.svg';

const NotFoundPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-center items-center h-auto flex-col">
      <img src={NotFound} style={{ width: '500px' }} />
      <p className="mb-4 text-blue-400 text-lg"> 页面找不到了</p>
      <Button type="primary" onClick={() => navigate('/index')}>
        去首页
      </Button>
    </div>
  );
};

export default NotFoundPage;
