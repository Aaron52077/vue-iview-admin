import axios from 'axios';
import store from '@/store';
import qs from 'qs';
import { Message } from 'view-design';
/**
 * 创建axios实例对象
 * withCredentials: true
 * send cookies when cross-domain requests
 */

export const instance = axios.create({
  timeout: 5 * 1000, // 请求超时时间
  retry: 4,
  retryDelay: 500
});

// request拦截器 请求处理
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    // 初始化默认post header
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded', // application/json
      Authorization: 'Basic Y2FtcHVzOmNhbXB1cw=='
    };
    let hasToken = store.getters.token;
    if (hasToken) {
      config.headers['Authorization'] = `Bearer ${hasToken}`; // 让每个请求携带token -- ['AUTH_TOKEN']为自定义key
    }
    return config;
  },
  error => {
    // Do something with request error
    Message.error(error || error.msg || '服务器繁忙，请稍后重试'); // for debug
    Promise.reject(error);
  }
);

// respone拦截器 响应处理
instance.interceptors.response.use(
  response => {
    const res = response.data;
    // 自定义报错规则
    if (response.status !== 200) {
      const status = Number(response.status);
      const { msg } = res;
      if (status === 401) {
        store.commit('setToken', null);
        Message.error(msg || '无访问权限！');
        return Promise.resolve(msg || 'error');
      } else {
        Message.error(msg || '服务器繁忙，请稍后重试');
        return Promise.resolve(msg || 'error');
      }
    } else {
      if (response.config.responseType === 'blob') {
        return Promise.resolve(response);
      } else {
        return Promise.resolve(res);
      }
    }
  },
  error => {
    // 请求直接报错 for debug
    Message.error(error.msg || '服务器繁忙，请稍后重试');
    return Promise.reject(error.response || error);
  }
);

/*
 * fetch方法（统一axios请求方法的格式）
 * url       请求URL
 * type      请求类型 默认转为大写
 * data      参数
 * isDown    是否下载文件流
 */
export const fetch = async (url = '', type = 'GET', data = {}, isDown = false) => {
  let result;
  type = type.toUpperCase();
  let requestOptions = {
    method: type,
    url: url,
    responseType: isDown ? 'blob' : 'json'
  };

  requestOptions['headers'] = {
    'Content-Type': isDown ? 'application/vnd.ms-excel' : 'application/x-www-form-urlencoded'
  };

  if (type === 'GET') {
    requestOptions['paramsSerializer'] = params => {
      return qs.stringify(params, { indices: false });
    };
    requestOptions['params'] = data;
  } else {
    requestOptions['data'] = data;
  }

  await instance(requestOptions).then(res => {
    result = res;
  });

  return result;
};

// 简化版
// export const flyio = async (url = '', method = 'GET',  data = {}) => {
// 	let result;
//     let methods = method.toUpperCase();
// 	let args = { url, method };
// 	let timestamp = Date.parse(new Date()) / 1000;
//     if (methods === 'GET') {
//         args.params = {
// 			t: timestamp,
// 			...data
// 		}
//     } else {
//         args.body = {
// 			t: timestamp,
//             ...data
//         }
// 	}
// 	await instance.request(args).then(res => {
//         result = res
// 	});
//     return result
// }
