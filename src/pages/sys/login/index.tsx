/*
 * @Author: weizheng
 * @Date: 2021-06-28 16:26:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-28 18:32:13
 */
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './index.less';

const Login: React.FC = () => {
  const [loginPage, setLoginPage] = useState<boolean>(true);
  const [isPwd, setIsPwd] = useState<boolean>(false);
  const handleToReg = () => {
    setLoginPage(!loginPage);
  };

  // 选择密码还是非密码登录
  const changeLoginType = (val) => {
    setIsPwd(!val);
  };
  return (
    <div className={`login relative w-full h-full px-4`}>
      <div className="container h-full mx-auto py-2 relative sm:px-10">
        <div className="flex h-full">
          <div className="hidden xl:flex xl:flex-col xl:w-6/12 min-h-full mr-4 pl-4">
            <div className="login-app-logo collapsed-show-title">
              <img src="/@/assets/svg/logo.svg" />
              <div className="ml-2 md:opacity-100 title">项目名</div>
            </div>
            <div className="my-auto">
              <img src="/@/assets/svg/login-box-bg.svg" className="-mt-16 w-1/2 -enter-x" />
              <div className="font-medium mt-10 text-white -enter-x">
                <span className="mt-4 text-3xl inline-block"> 啊你个头</span>
              </div>
              <div className="font-normal mt-5 text-md text-white dark:text-gray-500 -enter-x">
                三生三世
              </div>
            </div>
          </div>
          <div className="h-full xl:h-auto flex py-5 xl:py-0 xl:my-0 w-full xl:w-6/12">
            <div
              className={`login-form my-auto mx-auto xl:ml-20 xl:bg-transparent px-5 py-8 sm:px-8 xl:p-4 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto enter-x relative`}
            >
              <LoginForm handleToReg={handleToReg} show={loginPage} />
              <RegisterForm
                handleToReg={handleToReg}
                changeLoginType={changeLoginType}
                show={loginPage}
                showPwd={isPwd}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
