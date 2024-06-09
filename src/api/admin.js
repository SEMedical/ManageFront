import request from '@/util/http'

export const getAdminInfo = async () => {
	try {
		const response = await request({
			url: '/oa/getAdminInfo',
			method: 'GET',
		});
		console.log(response);
		return response.response;
	} catch (error) {
		console.error('获取管理员信息失败:', error);
		throw error;
	}
};

export const editAdminInfo = async (adminInfo) => {
	try {
		const response = await request({
			url: '/oa/editAdminInfo',
			method: 'POST',
			data: adminInfo,
		});
		console.log('editAdminInfo', response.success);
		return response.response;
	} catch (error) {
		console.error('编辑管理员信息失败:', error);
		throw error;
	}
};

export const getAccountList = async () => {
	try {
		const response = await request({
			url: '/oa/getAccountList',
			method: 'GET',
		});
		console.log(response);
		return response.response;
	} catch (error) {
		console.error('获取医生账户列表失败:', error);
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
		console.log('addAccount', response.success);
		return response.response;
	} catch (error) {
		console.error('添加医生账户失败:', error);
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
		console.log('editAccount', response.success);
		return response.response;
	} catch (error) {
		console.error('编辑医生账户失败:', error);
		throw error;
	}
};

export default {
	getAdminInfo,
	editAdminInfo,
    getAccountList,
    addAccount,
    editAccount,
};