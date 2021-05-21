import { defHttp } from '/@/utils/axios';
import { LoginParams, LoginResultModel } from './model/userModel';
enum Api {
  Login = '/login',
}

/**
 * @description: 用户登录
 */
export const loginApi = (params: LoginParams) =>
  defHttp.post<LoginResultModel>({
    url: Api.Login,
    params,
  });
