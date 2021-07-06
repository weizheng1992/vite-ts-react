/*
 * @Author: weizheng
 * @Date: 2021-06-28 16:26:00
 * @LastEditors: zz
 * @LastEditTime: 2021-07-06 17:08:06
 */
import React, { useCallback } from 'react';
import { Checkbox, Form, Input, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../../store/actions/user';

interface Props {
  handleToReg: () => void;
  show: boolean;
}

const FormItem = Form.Item;
const InputPassword = Input.Password;
const LoginForm: React.FC<Props> = ({ handleToReg, show }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { userId }: LoginResultModel = useSelector<RootState, LoginResultModel>(
  //   (state: RootState) => state.login.userInfo,
  //   shallowEqual
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
      <Row>
        <Col span={12}>
          <Button block onClick={handleToReg}>
            注册
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
