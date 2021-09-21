import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import Token from '/@/assets/svg/token.svg';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="flex w-full justify-center items-center h-auto flex-col">
      <img src={Token} style={{ width: '400px' }} />
      <p className="mb-4 text-blue-400 text-lg mt-8 font-mono">没有权限 </p>
      <Button
        type="primary"
        onClick={() =>
          navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })
        }
      >
        去登陆
      </Button>
    </div>
  );
};
export default Auth;
