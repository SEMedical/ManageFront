<template>
    <el-form 
        :label-position="'top'" 
        label-width="60px"
        :model="registerCredential"
        class="registerForm"
    >
        <div class="titleWrapper">
            <div class="registerTitle">注册</div>
        </div>

        <el-form-item label="用户名" v-bind:class="{ error: isError }">
            <el-input v-model="registerCredential.name" @click="clearErrorBorder" />
        </el-form-item>
        <el-form-item label="手机号" v-bind:class="{ error: isError }">
            <el-input v-model="registerCredential.contact" @click="clearErrorBorder" />
        </el-form-item>
        <el-form-item label="密码" v-bind:class="{ error: isError }">
            <el-input v-model="registerCredential.password" type="password" @click="clearErrorBorder" show-password/>
        </el-form-item>
        <el-form-item label="邀请码" v-bind:class="{ error: isError }">
            <el-input v-model="registerCredential.inviteCode" @click="clearErrorBorder" />
        </el-form-item>
        <div class="errorText">{{ errorMsg }}</div>
        <div class="textButtonHolder">
            <router-link to="/">
                <el-button type="primary" link>已有账号?点此登录</el-button>
            </router-link>
        </div>
        <div class="registerButtonHolder">
            <el-button type="primary" @click="onSubmit">注册</el-button>
        </div>
    </el-form>
</template>
  
<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";
import { adminRegisterAPI } from '@/api/register';

changeTheme('#02AFCC')

const registerCredential = reactive({
    name: '',
    contact: '',
    password: '',
    inviteCode: '',
})

const errorMsg = ref('')
const isError = ref(false)
const onSubmit = async () => {
    errorMsg.value = ''
    isError.value = false

    let regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (registerCredential.name === '') {
        errorMsg.value = '请输入用户名！'
        isError.value = true
        return
    } else if (registerCredential.contact === '') {
        errorMsg.value = '请输入手机号！'
        isError.value = true
        return
    } else if (!regPhone.test(registerCredential.contact)) {
        errorMsg.value = '请输入正确的手机号！'
        isError.value = true
        return
    } else if (registerCredential.password === '') {
        errorMsg.value = '请输入密码！'
        isError.value = true
        return
    } else if (registerCredential.inviteCode === '') {
        errorMsg.value = '请输入邀请码！'
        isError.value = true
        return
    } else {
        try {
            await adminRegisterAPI(registerCredential.inviteCode, registerCredential.name, registerCredential.contact, registerCredential.password);
            //location.reload();//查看返回值的时候先注释掉
        } catch (error) {
            console.error('注册失败：', error);
        }
    }
}

const clearErrorBorder = () => {
    isError.value = false
}
</script>
  
<style scoped>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.titleWrapper {
    text-align: center;
    margin-bottom: 10px;
    position: relative;
}

.registerTitle {
    font-size: 30px;
    color: var(--el-color-primary);
    font-weight: bold;
    margin-bottom: 5px;
}

.registerSubTitle {
    color: var(--el-color-primary);
}

.registerForm {
    width: 40%;
    height: 100%;
}

.textButtonHolder {
    text-align: right;
    margin-bottom: 20px;
}

.registerButtonHolder {
    width: 100%;
    text-align: center;
}

.registerButtonHolder>button {
    height: 40px;
    width: 60%;
}

.errorText {
    font-size: 10px;
    height: 0;
    width: 100%;
    color: var(--el-color-error);
    transform: translateY(-15px);
}

.error .el-input {
    --el-input-border-color: var(--el-color-error);
}

.inputWithButton {
    display: flex;
    width: 100%;
}

.inputWithButton .el-input {
    margin-right: 10px;
}
</style>
  