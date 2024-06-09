<template>
  <!--整个页面是可以上下滚动的-->
  <div  class="wrapper">
    <div>
      <el-card class="cardStyle">
        <el-descriptions
            class="margin-top"
            title="基本信息"
            :column="3"
            :size="size"
            border>
          <template #extra>
            <!--点“编辑”按钮可以对管理员信息进行编辑-->
            <el-button type="primary"  v-if="!isEdit" @click="edit">编辑</el-button>
            <el-button type="primary" v-if="isEdit" @click="save">保存</el-button>
          </template>
          <template>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  管理员ID：
                </div>
              </template>
              <!--从数据库获取管理员的工号-->
                  <span class="idStyle">{{ admin.adminId }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  姓名：
                </div>
              </template>
            <!-- 在编辑模式下显示输入框 -->
            <el-input v-if="isEdit" v-model="editedAdmin.name" />
            <!-- 非编辑模式下显示文本 -->
            <span v-else class="idStyle">{{ admin.name }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  联系方式：
                </div>
              </template>
            <!-- 在编辑模式下显示输入框 -->
            <el-input v-if="isEdit" v-model="editedAdmin.contact" />
            <!-- 非编辑模式下显示文本 -->
            <span v-else class="idStyle">{{ admin.contact }}</span>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </el-card>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from "element-plus";
import { getAdminInfo, editAdminInfo } from '@/api/admin';
const isEdit = ref(false); // 编辑状态
const size = ref('small'); // 描述组件的尺寸

interface AdminClass {
  adminId: number;//传来的id值是int型的，number不一定是整数，这个问题以后解决
  name: string;
  contact: string;
}

const admin = ref<AdminClass>({
  adminId: -1,
  name: '',
  contact: '',
});

const editedAdmin = ref<AdminClass>({
  adminId: -1,
  name: '',
  contact: '',
});

const fetchAdminInfo = async () => {
    try {
        const response = await getAdminInfo();
        admin.value = {
          adminId: response.adminId,
          name: response.name,
          contact: response.contact,
        };
		console.log('admin', admin.value);
    } catch (error) {
        console.error('aaa获取管理员信息失败：', error);
    }
};

onMounted(() => {
  fetchAdminInfo();
});

const edit = () => {
  isEdit.value = true;
  editedAdmin.value = { ...admin.value };
};

const save = async () => {
  await submitEditedAdmin();
  isEdit.value = false;
};

const submitEditedAdmin = async () => {
    if (!editedAdmin.value.name){
      ElMessage({
          type: 'warning',
          message: '管理员名不能为空',
        })
    } else if (!editedAdmin.value.contact){
      ElMessage({
          type: 'warning',
          message: '联系方式不能为空',
        })
    } else {
    try {
      const param = {
        adminId: editedAdmin.value.adminId,
        name: editedAdmin.value.name,
        contact: editedAdmin.value.contact,
      };
      await editAdminInfo(param);
      //location.reload();//查看返回值的时候先注释掉
    } catch (error) {
      console.error('编辑管理员信息失败：', error);
    }
  }
};
</script>

<style scoped>
/*边框样式设置*/
.cardStyle{
  border-color: white;
  border-width:2px;
  margin-bottom:10px;
  margin-top:10px;
}
/*头像部分的容器设置*/
.avatar-container{
  position:relative;
  display:inline-block;
}
/*用户头像样式*/
.avatar{
  border-radius:50%;
  object-fit: cover;
  margin-top:20px;
  margin-left:20px;
  width:100px;
  height:100px;
}
/*头像编辑按钮的样式设置*/
.pic-edit-button{
  position: absolute;
  bottom: 20px;
  right: 0;
  transform: translate(-50%, 50%);
  border-radius:50%;
  width:25px;
  height:25px;
  background-color: transparent;
  border-color: transparent;
  color:#666666;
}
/*鼠标悬浮在编辑按钮时的样式*/
.pic-edit-button:hover {
  background-color: #409EFF;
  border-color: #409EFF;
  color: #ffffff;
}
/*最上方的大的用户名字样*/
.userName{
  font-size:30px;
  /*font-family: 宋体;*/
  font-weight: bold;
  color:black;
}
/*”请登录“按钮样式*/
.login-button{
  background-color: white;
  color: red;
  border-color: white;
  font-size: 30px;
}
/*弹出的医师认证框的按钮设置*/
.dialog-footer {
  text-align: right;
}
.dialog-footer button:first-child {
  margin-right: 20px;
}

.wrapper{
  position: relative;
  width: 85%;
  margin: 0 auto;
}
/*ID的样式*/
.idStyle{
  margin-right:40px;
}
</style>