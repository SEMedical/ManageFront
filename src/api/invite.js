// 封装所有和用户相关的接口函数，只被/store/user.js调用
import request from '@/util/http'

export const getInviteCode = async (hospitalId) => {
	try {
        console.log('HospitalId', hospitalId);
		const response = await request({
			url: '/oa/GenInviteCode',
			method: 'POST',
			data: hospitalId,
		});
		return response.response;
	} catch (error) {
		console.error('验证失败:', error);
		throw error;
	}
};

export default getInviteCode;