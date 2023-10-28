import type { AxiosResponse } from 'axios';
import axios from 'axios';

// interface IData {
//   status: number;
//   message: string;
//   data: unknown;
// }

axios.defaults.timeout = 5000;
axios.defaults.headers.common['Content-Type'] =
  'application/json;charset=utf-8';

axios.interceptors.request.use(
  function (config: any) {
    // if (config.headers) {
    //   const token = store.get('token');
    //   config.headers['Authorization'] = token;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (config: AxiosResponse<any, any>) {
    const resp = config.data;
    console.log(resp);
    if (resp) {
      if (resp.status >= 200 && resp.status < 400) {
        return resp.data;
      }
      return Promise.reject(resp.message);
    }
    // return config;
  },
  function (error) {
    if (error.response?.status === 401) {
      // store.remove('token');
      // window.location.href = '/login';
      return;
    }
    return Promise.reject(error);
  },
);

export default axios;
