import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@flaticon/flaticon-uicons/css/all/all.css'
import "@/assets/main.css";
import '@/assets/misans.css'

import App from './App.vue'
import router from './router'
import axios from "axios";
import { createPinia } from 'pinia';

//axios.defaults.baseURL = "https://mock.apifox.cn/m1/2961538-0-default"

const app = createApp(App)
const pinia = createPinia();
app.use(ElementPlus)

app.use(router)
app.use(pinia)

app.mount('#app')
