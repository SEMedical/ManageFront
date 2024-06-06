import request from '@/util/http'
export const getAccountList = async () => {
	try {
		const response = await request({
			url: '/oa/getAccountList',
			method: 'GET',
		});
		console.log(response);
		return response;
	} catch (error) {
		console.error('验证失败:', error);
		throw error;
	}
};


export const addAccount = async (newDoctor) => {
	try {
		const response = await request({
			url: '/oa/addAccount',
			method: 'POST',
			data: newDoctor,
		});
		return response;
	} catch (error) {
		console.error('验证失败:', error);
		throw error;
	}
};

export const editAccount = async (editedDoctor) => {
	try {
		const response = await request({
			url: '/oa/editAccount',
			method: 'POST',
			data: editedDoctor,
		});
		return response;
	} catch (error) {
		console.error('验证失败:', error);
		throw error;
	}
};

export default {
    getAccountList,
    addAccount,
    editAccount
};