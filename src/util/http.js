// axios封装
import axios from 'axios'
import { ElMessage } from 'element-plus'

const httpInstance =axios.create({
	baseURL:'http://127.0.0.1:4523/m1/3732944-3363746-default/api',//本地mock，记得尾部加api
  timeout:5000
})

// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      //config.headers['Authorization'] = `Bearer ${token}`;//用于apifox
      config.headers['Authorization'] = `${token}`;
    }
    return config
},e => Promise.reject(e))


export default httpInstance;