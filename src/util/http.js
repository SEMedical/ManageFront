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

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data,e =>{
    // 统一错误提示
    if(e.response.data === -1){
        ElMessage({
            type:'warning',
            message:'密码错误，请重新输入'
        })
    }else if (e.response.data === -2) {
        ElMessage({
          type: 'warning',
          message: '账号已被封禁，请等待解禁',
        });
      } else if (e.response.data === -3) {
        ElMessage({
          type: 'warning',
          message: '用户不存在',
        });
      }else if (e.response.data === -4) {
        ElMessage({
          type: 'warning',
          message: '此手机号已被注册，请重新选择手机号',
        });
      } else {
        ElMessage({
            type: 'warning',
            message: '服务器错误',
          });
      }
    
    return Promise.reject(e)
})


export default httpInstance;