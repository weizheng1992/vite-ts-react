/*
 * @Author: weizheng
 * @Date: 2021-07-05 11:21:48
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-18 15:12:56
 */
import { message as $message } from 'antd';
// import { useNavigate } from 'react-router-dom';

export function checkStatus(status: number, msg: string): void {
  // const navigate = useNavigate();
  switch (status) {
    case 400:
      $message.error(`${msg}`);
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      $message.error('用户没有权限（令牌、用户名、密码错误）!');
      localStorage.removeItem('token');
      // navigate('/login');
      break;
    case 403:
      $message.error(`用户得到授权，但是访问是被禁止的。!`);
      break;
    // 404请求不存在
    case 404:
      $message.error('网络请求错误,未找到该资源!');
      break;
    case 405:
      $message.error('网络请求错误,请求方法未允许!');
      break;
    case 408:
      $message.error('网络请求超时!');
      break;
    case 500:
      $message.error('服务器错误,请联系管理员!');
      break;
    case 501:
      $message.error('网络未实现!');
      break;
    case 502:
      $message.error('网络错误!');
      break;
    case 503:
      $message.error('服务不可用，服务器暂时过载或维护!');
      break;
    case 504:
      $message.error('网络超时!');
      break;
    case 505:
      $message.error('http版本不支持该请求!');
      break;
    default:
  }
}
