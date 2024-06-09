<template>
  <div style="display: flex;align-items: center;margin-bottom: 20px;">
	<span style="font-size:14px;margin-left:25px;font-weight:bold;color: rgb(123, 123, 123);">医生ID &nbsp;&nbsp;</span>
	<el-input v-model="idFilter" @input="filterHandler" placeholder="搜索医生ID" style="display: flex;align-items: center;text-align: center;width:180px;box-shadow: 0 0px 1px rgba(66, 66, 66, 0.2);;"></el-input>
    <span style="font-size:14px;margin-left:25px;font-weight:bold;color: rgb(123, 123, 123);">姓名 &nbsp;&nbsp;</span>
	<el-input v-model="nameFilter" @input="filterHandler" placeholder="搜索医生姓名" style="display: flex;align-items: center;text-align: center;width:180px;box-shadow: 0 0px 1px rgba(66, 66, 66, 0.2);;"></el-input>
    <span style="font-size:14px;margin-left:25px;font-weight:bold;color: rgb(123, 123, 123);">科室 &nbsp;&nbsp;</span>
    <el-select @change="filterHandler" style="width:180px;display: flex;align-items: center;text-align: center;" v-model="departmentFilter" clearable placeholder="选择医生科室">
      <el-option label="内分泌科" value="内分泌科"></el-option>
      <el-option label="全科" value="全科"></el-option>
  </el-select>
  <span style="font-size:14px;margin-left:25px;font-weight:bold;color: rgb(123, 123, 123);">职位 &nbsp;&nbsp;</span>
    <el-select @change="filterHandler" style="width:180px;display: flex;align-items: center;text-align: center;" v-model="titleFilter" clearable placeholder="选择医生职位">
      <el-option label="主任医师" value="主任医师"></el-option>  
      <el-option label="副主任医师" value="副主任医师"></el-option>
      <el-option label="主治医师" value="主治医师"></el-option>  
	  <el-option label="住院医师" value="住院医师"></el-option>  
  </el-select>
  <span style="font-size:14px;margin-left:25px;font-weight:bold;color: rgb(123, 123, 123);">状态 &nbsp;&nbsp;</span>
    <el-select @change="filterHandler" style="width:180px;display: flex;align-items: center;text-align: center;" v-model="stateFilter" clearable placeholder="选择医生状态">
      <el-option label="正常" value="正常"></el-option>  
      <el-option label="注销" value="注销"></el-option> 
  </el-select>
</div>
    <el-table :data="tableData" style="width: 100%;box-shadow: 0 0px 4px rgba(66, 66, 66, 0.2);border-radius: 10px;" max-height="530">
      <el-table-column label="医生ID" prop="doctorId"  align="center"></el-table-column>
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="照片" prop="photoPath"  align="center"></el-table-column>
      <el-table-column label="身份证号" prop="idCard"  align="center"></el-table-column>
	  <el-table-column label="手机号" prop="contact"  align="center"></el-table-column>
      <el-table-column label="职位" prop="title"  align="center"></el-table-column>
      <el-table-column label="科室" prop="department"  align="center"></el-table-column>
	  <el-table-column label="状态" prop="state"  align="center"></el-table-column>
		<el-table-column label="操作" width="200" align="center">
		  <template #default="scope">
			<el-button plain type="primary" size="small" @click.prevent="editRow(scope.$index)">
			  编辑
			</el-button>
		  </template>
		</el-table-column>
    </el-table>
    <br/>
    <el-button type="primary" @click="addRow">添加医生</el-button>
    <!-- Edit Doctor Dialog -->
    <el-dialog v-model="editDialogVisible" title="编辑医生信息" @close="editDialogInvisible">
      <el-form :model="editedDoctor" label-width="80px">
        <!-- 表单内容 -->
        <el-form-item label="姓名">
          <el-input v-model="editedDoctor.name"></el-input>
        </el-form-item>
		<el-form-item label="身份证号">
		  <el-input v-model="editedDoctor.idCard"></el-input>
		</el-form-item>
		<el-form-item label="手机号">
		  <el-input v-model="editedDoctor.contact"></el-input>
		</el-form-item>
        <el-form-item label="职位">
          <el-select v-model="editedDoctor.title">
			  <el-option label="主任医师" value="主任医师"></el-option>  
			  <el-option label="副主任医师" value="副主任医师"></el-option>
			  <el-option label="主治医师" value="主治医师"></el-option>  
			  <el-option label="住院医师" value="住院医师"></el-option> 
          </el-select>
        </el-form-item>
		<el-form-item label="科室">
		  <el-select v-model="editedDoctor.department">
			  <el-option label="内分泌科" value="内分泌科"></el-option>
			  <el-option label="全科" value="全科"></el-option>
		  </el-select>
		</el-form-item>
		<el-form-item label="状态">
		  <el-select v-model="editedDoctor.state">
			<el-option label="正常" value="正常"></el-option>
			<el-option label="禁用" value="禁用"></el-option>
		  </el-select>
		</el-form-item>
    <el-form-item label="照片">
		  <el-input v-model="editedDoctor.photoPath"></el-input>
		</el-form-item>
        <!--<el-form-item label="原照片">
          <img :src = "editedDoctor.photoPath" style="max-width: 148px; max-height: 148px; border-radius: 5%;" alt="原图片">
        </el-form-item>
        <el-form-item label="新照片(若新照片为空，保留原图)">
          <el-upload
            :http-request="httpRequest"
            multiple
            :limit="1"
            :show-file-list="true"
            list-type="picture-card"
            :class="{hide:hideUpload}"
            :on-change="handleEditChange"
            :on-remove="handleRemove"
        ><el-icon><Plus /></el-icon>
        </el-upload>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogInvisible">取消</el-button>
        <el-button type="primary" @click="submitEditedDoctor">保存</el-button>
      </div>
    </el-dialog>

    <!-- Add Doctor Dialog -->
    <el-dialog v-model="addDialogVisible" title="添加医生信息" @close="addDialogInvisible">
      <el-form :model="newDoctor" label-width="80px">
        <!-- 表单内容 -->
        <el-form-item label="姓名">
          <el-input v-model="newDoctor.name"></el-input>
        </el-form-item>
		<el-form-item label="身份证号">
		  <el-input v-model="newDoctor.idCard"></el-input>
		</el-form-item>
		<el-form-item label="手机号">
		  <el-input v-model="newDoctor.contact"></el-input>
		</el-form-item>
        <el-form-item label="职位">
          <el-select v-model="newDoctor.title">
			  <el-option label="主任医师" value="主任医师"></el-option>  
			  <el-option label="副主任医师" value="副主任医师"></el-option>
			  <el-option label="主治医师" value="主治医师"></el-option>  
			  <el-option label="住院医师" value="住院医师"></el-option> 
          </el-select>
        </el-form-item>
		<el-form-item label="科室">
		  <el-select v-model="newDoctor.department">
			<el-option label="内分泌科" value="内分泌科"></el-option>
			<el-option label="全科" value="全科"></el-option>
		  </el-select>
		</el-form-item>
    <el-form-item label="照片">
		  <el-input v-model="newDoctor.photoPath"></el-input>
		</el-form-item>
		<!--<el-form-item label="照片">
		  <el-upload
		    :http-request="httpRequest"
		    multiple
		    :limit="1"
		    :show-file-list="true"
		    list-type="picture-card"
		    :class="{hide:hideUpload}"
		    :on-change="handleEditChange"
		    :on-remove="handleRemove"
		><el-icon><Plus /></el-icon>
		</el-upload>
		</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogInvisible">取消</el-button>
        <el-button type="primary" @click="submitNewDoctor">添加</el-button>
      </div>
    </el-dialog>
</template>

<style>
.hide .el-upload--picture-card {
    display: none;
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { getAccountList, addAccount, editAccount } from '@/api/admin';


//接口类的作用是定义对象的结构，确保对象符合特定的形状
interface NewDoctorClass {
  hospitalId: number;//这个不一定需要，先加着
  name: string;
  photoPath:string;//先存字符串，以后改成照片
  idCard: string;
  contact: string;
  title: string;
  department: string;
}

interface EditedDoctorClass {
  doctorId: number;//传来的id值是int型的，，number不一定是整数，这个问题以后解决
  name: string;
  photoPath:string;//先存字符串，以后改成照片
  idCard: string;
  contact: string;
  title: string;
  department: string;
  state: string;
}

//以下部分和传图有关
const fileList = ref([])
const hideUpload = ref(false);

function httpRequest(option) {
    fileList.value.push(option);
}

function handleEditChange(file,fileList){
  hideUpload.value = fileList.length >= 1;
}

function handleRemove(file,fileList){
  hideUpload.value = fileList.length >= 1;
}

const tableData = ref([]);
const tableDataNoFilt= ref([]);
const editDialogVisible = ref(false);
const addDialogVisible = ref(false);
const idFilter = ref('');
const nameFilter = ref('');
const departmentFilter = ref('');
const titleFilter = ref('');
const stateFilter = ref('');
function filterHandler(value){
    tableData.value = tableDataNoFilt.value.filter(item => {
	  const idMatch = item.doctorId.toString() === idFilter.value || !idFilter.value;//比对的时候需将字符串转成数字
    const nameMatch = item.name === nameFilter.value || !nameFilter.value;
    const departmentMatch=item.department===departmentFilter.value||!departmentFilter.value;
    const titleMatch=item.title===titleFilter.value||!titleFilter.value
	const stateMatch=item.state===stateFilter.value||!stateFilter.value
    return idMatch && nameMatch && departmentMatch && titleMatch && stateMatch;
  });
};


const editDialogInvisible = async() => {
  editDialogVisible.value = false;//和接口的连接在dialog里
  console.log("输出图片列表1");
  console.log(fileList.value);
  location.reload(); // 这里会刷新整个页面

};

const addDialogInvisible = async() => {
  addDialogVisible.value = false;//和接口的连接在dialog里
  location.reload(); // 这里会刷新整个页面
};

const newDoctor = ref<NewDoctorClass>({
  hospitalId: 3,//暂时改成默认为3，后面再根据管理员token推出来
  name: '',
  photoPath: '',
  idCard: '',
  contact: '',
  department:'内分泌科',
  title:'主任医师',
});

const editedDoctor = ref<EditedDoctorClass>({
  doctorId: -1,
  name: '',
  photoPath: '',
  idCard: '',
  contact: '',
  department:'',
  title:'',
  state:'',
});

const getDoctorList = async () => {
    try {
        const response = await getAccountList();//这两个不能重名
        for (const doctor of response) {
			tableDataNoFilt.value.push({
				doctorId: doctor.doctorId,
				name: doctor.name,
				photoPath: doctor.photoPath,
				idCard: doctor.idCard,
				contact: doctor.contact,
				title: doctor.title,
				department: doctor.department,
				state: doctor.state,
			});
        }
		console.log('tableDataNoFilt', tableDataNoFilt.value);
    } catch (error) {
        console.error('获取医生列表时出错：', error);
    }
};

onMounted(() => {
  //getDoctorList();
      getDoctorList().then(() => {
          tableData.value = tableDataNoFilt.value;  // 确保在数据获取后初始化 tableData
      });
});

const addRow = () => {
  addDialogVisible.value = true;//和接口的连接在dialog里
};

const editRow = (index) => {
  editedDoctor.value = {
    doctorId: tableData.value[index].doctorId,
    name: tableData.value[index].name,
    photoPath: tableData.value[index].photoPath,
    idCard: tableData.value[index].idCard,
    contact: tableData.value[index].contact,
    department: tableData.value[index].department,
    title: tableData.value[index].title,
    state: tableData.value[index].state,
  };
  editDialogVisible.value = true;//和接口的连接在dialog里
};

const submitNewDoctor = async() => {
  try {
    const param = {
      hospital_id: newDoctor.value.hospitalId,
      name: newDoctor.value.name,
      photo_path: newDoctor.value.photoPath,
      id_card: newDoctor.value.idCard,
      contact: newDoctor.value.contact,
      department: newDoctor.value.department,
      title: newDoctor.value.title,
    };
    const response = await addAccount(param);//注意：需保证id不能被修改
    console.log('message', response);
    location.reload();//查看返回值的时候先注释掉
  } catch (error) {
    console.error('添加数据失败：', error);
  }
};

const submitEditedDoctor = async () => {
  
  
  if (!editedDoctor.value.name){
      ElMessage({
          type: 'warning',
          message: '医生名不能为空',
        })
    }else{
    try {
      const param = {
        doctorId: editedDoctor.value.doctorId, // 编辑界面不显示id，但是要传id值
        name: editedDoctor.value.name,
        photoPath: editedDoctor.value.photoPath,
        idCard: editedDoctor.value.idCard,
        contact: editedDoctor.value.contact,
        department: editedDoctor.value.department,
        title: editedDoctor.value.title,
        state: editedDoctor.value.state,
      };
      const response = await editAccount(param);
      console.log('message', response);
      location.reload();//查看返回值的时候先注释掉
    } catch (error) {
      console.error('编辑数据失败：', error);
    }
  }
};

</script>