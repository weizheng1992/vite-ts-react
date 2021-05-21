import React from 'react';
import { Checkbox, Form, Input, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const FormItem = Form.Item;
const InputPassword = Input.Password;
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    navigate('/index');
  };
  return (
    <>
      <h2 className="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">登录</h2>
      <Form className="p-4 enter-x" name="login" onFinish={onFinish}>
        <FormItem name="account" className="enter-x">
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
