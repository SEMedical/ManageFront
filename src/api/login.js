// 封装所有和用户相关的接口函数，只被/store/user.js调用
import request from '@/util/http'

export const loginAPI = async ({ contact, password }) => {
	try {
		const response = await request({
			url: '/login/pass',
			method: 'POST',
			data: {
			  contact,
			  password
			},
		});
		return response;
	} catch (error) {
		console.error('验证失败:', error);
		throw error;
	}
};

export default loginAPI;