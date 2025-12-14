// src/utils/service.js
import { request } from 'umi';
import { message } from 'antd';

/**
 * 通用请求方法
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {string} [method='post'] 请求方法：post/get
 * @returns {Promise} 返回Promise对象
 */
export function service({
    url,
    params = {},
    method = 'post'
}) {
  const options = {
    method: method.toLowerCase(),
    params: method.toLowerCase() === 'get' ? params : undefined,
    data: method.toLowerCase() === 'post' ? params : undefined,
    errorHandler: (error) => {
      // 统一处理网络错误
      message.error('网络请求异常，请稍后重试');
      return Promise.reject(error);
    }
  };

  return request(url, options)
    .then(
      response => {
        // 处理业务逻辑错误
        if (response.code !== 200) {
          message.error(response.msg || '操作失败');
          return Promise.reject(response);
        }
        return response;
      }
    )
    .catch(error => {
      // 统一错误处理（已由errorHandler处理，此处仅防止未捕获的异常）
      return Promise.reject(error.response);
    });
}