import { defHttp } from '/@/utils/axios';
import { LoginParams, LoginResultModel } from './model/userModel';

const Login = ({
  username,
  password,
}: LoginParams) => `query {login (username: "${username}", password: "${password}"){
     id
    token
  }
}`;

const Register = ({ username, password }: LoginParams) => `mutation{
  createUser(name: "${username}", username: "${username}", password: "${password}"){
    id
    name
    username
    mobile
    password
  }
}`;

/**
 * @description: 用户登录
 */
export const loginApi = (params: LoginParams) =>
  defHttp.post<LoginResultModel>(
    {
      url: '',
      params: { query: Login(params) },
    },
    {
      gqlKey: 'login',
    }
  );

/**
 * @description: 用户 注册
 */
export const registerApi = (params: LoginParams): Promise<LoginResultModel> =>
  defHttp.post<LoginResultModel>(
    {
      params: { query: Register(params) },
    },
    {
      gqlKey: 'login',
    }
  );
