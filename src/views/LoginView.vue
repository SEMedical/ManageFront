<template>
    <el-form
        :label-position="'top'"
        label-width="60px"
        :model="loginCredential"
        class="loginForm"
    >
        <div class="titleWrapper">
            <div class="loginTitle">管理员登录</div>
            <div class="loginSubTitle">登录以继续</div>
        </div>

        <el-form-item label="手机号" v-bind:class="{ error: isError }">
            <el-input v-model="loginCredential.contact" @click="clearErrorBorder" type="number" step="1" min="0"/>
        </el-form-item>
        <el-form-item label="密码" v-bind:class="{ error: isError }">
            <el-input v-model="loginCredential.password" type="password" @click="clearErrorBorder" show-password/>
        </el-form-item>
        <div class="errorText">{{errorMsg}}</div>
        <div class="textButtonHolder">
            <router-link to="/login/register">
                <el-button type="primary" link>注册</el-button>
            </router-link>
            <router-link to="/login/forgot">
                <el-button type="primary" link>忘记密码?</el-button>
            </router-link>
        </div>
        <div class="loginButtonHolder">
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </div>
    </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue'
import axios from "axios";
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";

changeTheme("#02AFCC")

const loginCredential = reactive({
    contact: '',
    password: '',
})

const errorMsg = ref('')
const isError = ref(false)
const onSubmit = async () => {
    errorMsg.value = "";
    isError.value = false;

    if(loginCredential.contact===''){
        errorMsg.value = "手机号不能为空"
        isError.value = true
        return
    }
    //http://192.168.1.104:5144
    let response = await axios.post("/api/login/pass",loginCredential)
    let responseObj = response.result;
    if(response.is_success==0){
        errorMsg.value = "错误代码" + response.msg;
        isError.value = true;
    }else{
		isError.value = false;
		errorMsg.value = ''
		await router.push("/")
    }
}

const clearErrorBorder = () =>{
    isError.value = false;
}
</script>

<style scoped>

.demo-form-inline .el-input {
    --el-input-width: 220px;
}


.titleWrapper{
    text-align: center;
    margin-bottom:  30px;
    position: relative;
}

.loginTitle{
    font-size: 30px;
    color: var(--el-color-primary);
    font-weight: bold;
    margin-bottom: 5px;
}

.loginSubTitle{
    color: var(--el-color-primary);
}

.loginForm{
    width: 40%;
    height: 80%;
}

.textButtonHolder{
    text-align: right;
    margin-bottom: 20px;
}

.loginButtonHolder{
    width: 100%;
    text-align: center;
}

.loginButtonHolder>button{
    height: 40px;
    width: 60%;
}
.errorText{
    font-size: 10px;
    height: 0;
    width: 100%;
    color: var(--el-color-error);
    transform: translateY(-15px);
}

.error .el-input{
    --el-input-border-color:var(--el-color-error)

}
</style>