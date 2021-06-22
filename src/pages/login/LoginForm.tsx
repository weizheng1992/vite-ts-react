import React, { useCallback, useEffect } from 'react';
import { Checkbox, Form, Input, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { loginRequest } from '/@/store/actions/login';
// import { useShallowEqualSelector } from '/@/hooks/useRedux';
import RootState from '/@/store/types/rootState';
import { LoginResultModel } from '/@/store/types/login';

const FormItem = Form.Item;
const InputPassword = Input.Password;
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data: LoginResultModel = useSelector<RootState, LoginResultModel>(
    (state: RootState) => state.login.userInfo,
    shallowEqual
  );
  // const data = useShallowEqualSelector((state: RootState) => state.login.userInfo);
  console.log(data);
  const onFinish = useCallback(
    (values: any) => {
      dispatch(loginRequest(values));
    },
    [dispatch]
  );
  useEffect(() => {
    if (data.userId) {
      navigate('/index');
    }
  }, [data.userId]);
  return (
    <>
      <h2 className="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">登录</h2>
      <Form className="p-4 enter-x" name="login" onFinish={onFinish}>
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
  );
};

export default LoginForm;
