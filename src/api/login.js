// 封装所有和用户相关的接口函数，只被/store/user.js调用
import request from '@/util/http'

export const loginAPI = async ({ contact, password }) => {
  try {
	console.log(contact);
	console.log(password);
    // 使用JSON.stringify()将对象转换为JSON格式的字符串
    const jsonData = JSON.stringify({
      contact,
      password
    });
	
	console.log(jsonData);

    const response = await request({
      url: '/login/pass',
      method: 'POST',
      // 将data对象替换为JSON字符串，并设置适当的Content-Type头部
      data: jsonData,
      headers: {
        'Content-Type': 'application/json' // 指定发送的数据是JSON格式
      }
    });

    // 假设 token 存在于响应数据中
    const token = response.response.token;
    console.log(token);
    return response;
  } catch (error) {
    console.error('验证失败:', error);
    throw error;
  }
};

export default loginAPI;