import React, { useCallback, useState } from 'react';
import { Checkbox, Form, Input, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest, registerRequest } from '/@/store/actions/login';

const FormItem = Form.Item;
const InputPassword = Input.Password;
const LoginForm: React.FC = () => {
  const [flag, setFlag] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { userId }: LoginResultModel = useSelector<RootState, LoginResultModel>(
  //   (state: RootState) => state.login.userInfo,
  //   shallowEqual
  // );
  const onFinish = useCallback(
    (values: any, name: string) => {
      if (name === 'login') {
        dispatch(loginRequest(values, () => navigate('/index')));
        return;
      }
      if (name === 'register') {
        dispatch(registerRequest(values, () => navigate('/index')));
        return;
      }
    },
    [dispatch]
  );

  const chageLogin = useCallback((value: boolean) => {
    setFlag(!value);
  }, []);
  return (
    <>
      {!flag && (
        <>
          <h2 className="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">
            登录
          </h2>
          <Form
            className="p-4 enter-x"
            name="login"
            onFinish={(values) => onFinish(values, 'login')}
          >
            <FormItem name="username" className="enter-x">
              <Input size="large" placeholder="邮箱" />
            </FormItem>
            <FormItem name="password" className="enter-x">
              <InputPassword size="large" placeholder="密码" />
            </FormItem>

            <Row className="enter-x">
              <Col span="12">
                <FormItem>
                  <Checkbox>记住密码</Checkbox>
                </FormItem>
              </Col>
            </Row>

            <FormItem className="enter-x">
              <Button type="primary" block size="large" htmlType="submit">
                登录
              </Button>
            </FormItem>
          </Form>
        </>
      )}
      {flag && (
        <>
          <h2 className="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">
            注册
          </h2>
          <Form
            className="p-4 enter-x"
            name="register"
            onFinish={(values: any) => onFinish(values, 'register')}
          >
            <FormItem name="username" className="enter-x">
              <Input size="large" placeholder="邮箱" />
            </FormItem>
            <FormItem name="password" className="enter-x">
              <InputPassword size="large" placeholder="密码" />
            </FormItem>

            <Row className="enter-x">
              <Col span="12">
                <FormItem>
                  <Checkbox>记住密码</Checkbox>
                </FormItem>
              </Col>
            </Row>

            <FormItem className="enter-x">
              <Button type="primary" block size="large" htmlType="submit">
                注册
              </Button>
            </FormItem>
          </Form>
        </>
      )}
      <a
        href="#"
        onClick={() => {
          chageLogin(flag);
        }}
      >
        {flag ? '登录' : '注册'}
      </a>
    </>
  );
};

export default LoginForm;
