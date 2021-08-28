/*
 * @Author: zhuoyu
 * @Date: 2021-06-28 17:04:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-28 18:31:23
 */
import React, { useCallback } from 'react';
import { Checkbox, Form, Input, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../../../store/actions/user';
interface Props {
  handleToReg: () => void;
  changeLoginType: (val: string) => void;
  show: boolean;
  showPwd: boolean;
}
const FormItem = Form.Item;
const InputPassword = Input.Password;
const LoginForm: React.FC<Props> = ({ handleToReg, show, changeLoginType, showPwd }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { userId }: LoginResultModel = useSelector<RootState, LoginResultModel>(
  //   (state: RootState) => state.login.userInfo,
  //   shallowEqual
  // );
  const onFinish = useCallback(
    (values: any) => {
      dispatch(registerRequest(values, () => navigate('/index')));
    },
    [dispatch]
  );

  console.log('Register____');
  // const chageLogin = useCallback((value: boolean) => {
  //   setFlag(!value);
  // }, []);
  return (
    <div style={{ display: !show ? 'block' : 'none' }}>
      <h2 className="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">注册</h2>
      <Form className="p-4 enter-x" name="register" onFinish={(values: any) => onFinish(values)}>
        <div style={{ display: !showPwd ? 'block' : 'none' }}>
          <FormItem name="username" className="enter-x">
            <Input size="large" placeholder="手机号" />
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
          <div
            className="switchCode"
            onClick={() => {
              changeLoginType('');
            }}
          >
            免密码登录
          </div>
        </div>
        <div style={{ display: !showPwd ? 'none' : 'block' }}>
          <FormItem name="phone" className="enter-x">
            <Input size="large" placeholder="手机号" />
          </FormItem>
          <div className="checkCode">
            <div className="codeMain">
              <div className="codeField">
                <FormItem name="phone" className="enter-x">
                  <Input size="large" placeholder="验证码" />
                </FormItem>
              </div>
              <div className="codeBtn">
                <button className="btn">
                  <span className="codeText">获取短信验证码</span>
                </button>
              </div>
            </div>
            <div
              className="codePwdLink"
              onClick={() => {
                changeLoginType('1');
              }}
            >
              密码登录
            </div>
          </div>
        </div>

        <FormItem className="enter-x">
          <Button type="primary" block size="large" htmlType="submit">
            注册
          </Button>
        </FormItem>
      </Form>
      <Row>
        <Col span={12}>
          <Button block onClick={handleToReg}>
            返回
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
