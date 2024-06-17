<script setup>

import LinkButtonWithIcon from "@/components/LinkButtonWithIcon.vue";
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";
import {onMounted, reactive, ref} from "vue";
import {ElMenuItem, ElMessage, ElSubMenu} from "element-plus";
import { getInviteCode } from '@/api/invite'

changeTheme("#0093bf")
const dialogVisible = ref(false);
const hospitalId = ref(''); // 用于绑定输入框的变量
const generatedInviteCode = ref(''); // 用于存储生成的邀请码
const showCode = ref(false); // 控制是否显示邀请码



const handleClose = () => {
      // 重置输入框和邀请码
      hospitalId.value = '';
      generatedInviteCode.value = '';
      showCode.value = false;
      dialogVisible.value = false;
};

const confirmAction = async () => {
    if (!hospitalId.value) {
    alert('请先输入医院ID');
    return;
    }
    try {
        const response = await getInviteCode(hospitalId.value);//这两个不能重名
        console.log('generatedInviteCode', response.response);
        if (response.response) {
            generatedInviteCode.value = response.response; // 存储后端返回的邀请码
            showCode.value = true; // 显示邀请码
        } else {
            alert('生成邀请码失败，请稍后再试或联系管理员');
        }
    } catch (error) {
        console.error('获取邀请码时出错：', error);
    }
};

const menuItemClick = (ke) => {
    router.push(ke.index)
}

const exitButtonClicked = async ()=>{
    router.push("/")
}

const menus = [
    {"title":"个人信息","icon":"fi-rr-user-gear","path":"/home/adminiInfo"},
    {"title":"审核","icon":"fi-rr-memo-circle-check","path":"/home/qualificationVerify"},
];

const getSidebarPath = () => {
    let path = router.currentRoute.value.path.split("/")
    if(path.length === 1){
        return ""
    }else{
        return "/" + path[1];
    }


}

const menu = ref();
onMounted(()=>{
    (()=>{
        let menuItemNow = getSidebarPath();
        for(let item of menus){
            if(!item.children) continue;
            for(let child of item.children){
                if(child.path===menuItemNow){
                    menu.value.open(item.path);
                }
            }
        }
    })()
})

</script>

<template>
    <div class="pageWrapper">
        <div class="headerHolder">
            <div class="leftTitle">
                <img alt="" src="../assets/logo.png">
<!--                <SearchBox @searchStart="searchStart"></SearchBox>-->
            </div>
            <div class="rightTitle" >
                <LinkButtonWithIcon font-color="#fff" text="退出" icon="" @click="exitButtonClicked"></LinkButtonWithIcon>
                <img alt="" src="../assets/titleImg1.png">

                <LinkButtonWithIcon font-color="#fff" text="邀请码" icon="" @click="dialogVisible = true"></LinkButtonWithIcon>
                    <el-dialog
                    title="输入医院ID生成邀请码"
                    v-model="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <div class="input-button-container">
                        <el-input
                        v-model="hospitalId"
                        placeholder="请输入医院ID"
                        suffix-icon="el-icon-check"
                        @keyup.enter="confirmAction"
                        />
                        <el-button type="primary" @click="confirmAction">生成邀请码</el-button>
                    </div>
                    <div v-if="showCode" class="code-display">
                    邀请码: <strong>{{ generatedInviteCode }}</strong>
                    </div>
                </el-dialog>
            </div>
        </div>
        <div class="contentHolder">
            <div class="sideBar">
                <div class="userInfoWrapper">
                    <!--<UserInfoCard :user-info="userInfo.data" showAvatarBorder @click="avatarClicked"></UserInfoCard>-->
                </div>


                <el-menu :default-active="getSidebarPath()" class="sideBarMenu" ref="menu">
                    <component v-for="item in menus" :is="item.children ? ElSubMenu : ElMenuItem" :index="item.path" v-on="item.children ? {}: {click: menuItemClick}">
                        <template #title>
                            <i class="fi" :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <el-menu-item v-if="item.children" v-for="child in item.children" :index="child.path" @click="menuItemClick">
                            <i class="fi" :class="child.icon"></i>
                            <span>{{child.title}}</span>
                        </el-menu-item>
                    </component>
                </el-menu>
            </div>

            <div class="content">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>


<style scoped>

.input-button-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.headerHolder{
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    background-color: var(--el-color-primary);
    display: flex;
    justify-content: space-between;
    max-height: 60px;
    flex: 1;
}
.headerHolder>div{
    display: flex;
    align-items: center;
    margin: 0 20px;
}

.pageWrapper{
    height: 100vh;
    width: 100%;
    min-width: 1200px;
    max-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.leftTitle img {
    max-height: 50px;
    margin-right: 20px;
}

.rightTitle img{
    height: 60px;
}

.rightTitle>*{
    margin: 0 10px;
}

.line{
    border-left: #fff 1px solid;
    height: 1em;
    width: 1px;
    margin: 0 5px;
}

.contentHolder{
    display: flex;
    justify-items: stretch;
    flex: 3;
    overflow: hidden;

}


.content{
    overflow-y: auto;
    background-color: var(--el-color-primary-light-9);
    flex: 1;
}

.sideBar{
    width: 230px;
    min-width: 230px;
    max-width: 230px;
    flex: 3;
}

.sideBar .sideBarMenu{
    border-right: none;
}

.sideBar .sideBarMenu i{
    margin-right: 10px;
    font-size: 1.1em;
}

.userInfoWrapper{
    padding: 10px 20px;
    border-bottom: 1px #eee solid;
    cursor: pointer;
}
</style>