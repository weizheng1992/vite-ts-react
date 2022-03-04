/*
 * @Author: weizheng
 * @Date: 2021-06-28 16:26:00
 * @LastEditors: zz
 * @LastEditTime: 2021-07-06 19:32:25
 */
import React, { useCallback } from 'react';
import { Checkbox, Form, Input, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../../store/actions/user';

// import { useShallowEqualSelector } from '/@/hooks/useRedux';
// import { LoginResultModel } from '/@/store/types/user';
interface Props {
  handleToReg: () => void;
  show: boolean;
}

const FormItem = Form.Item;
const InputPassword = Input.Password;
const LoginForm: React.FC<Props> = ({ handleToReg, show }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { userId }: LoginResultModel = useShallowEqualSelector<LoginResultModel>(
  //   (state) => state.user.userInfo
  // );
  const onFinish = useCallback(
    (values: any) => {
      dispatch(loginRequest(values, () => navigate('/index')));
    },
    [dispatch]
  );
  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <h2 className="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">登录</h2>
      <Form className="p-4 enter-x" name="login" onFinish={(values) => onFinish(values)}>
        <FormItem name="username" className="enter-x mb-4">
          <Input size="large" placeholder="邮箱" />
        </FormItem>
        <FormItem name="password" className="enter-x mb-4">
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
      <Row className="p-4">
        <Col span={12}>
          <Button block onClick={handleToReg} size="large">
            注册
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
