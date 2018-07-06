<template>
  <div class="app-container">
    <!--表单项-->
    <el-form :model="msgForm" :rules="rules" ref="msgForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="微信公众号">
            <el-select style="width: 100%" placeholder="请选择公众号名称" class="filter-item" v-model="msgForm.mp_id">
              <el-option v-for="mp in mpOptions" :key="mp" :label="mp" :value="mp">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="消息模板">
            <el-select style="width: 100%" placeholder="请选择消息模板" class="filter-item" v-model="msgForm.mp_tpl_id">
              <el-option v-for="tpl in tplOptions" :key="tpl" :label="tpl" :value="tpl">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="tpl-form-item"  label="通知内容" style="border-width: 10px">
        <el-form-item v-for="(value, key) in msgForm.mp_msg_content" :key="key" :label="key" :value="value">
          <el-input v-model="msgForm.mp_msg_content[key]"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="接收用户" >
        <el-button type="primary" size="small" plain @click="showDialog()">选择接收通知用户</el-button>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="msgForm.mp_msg_touser">
        </el-input>


      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('msgForm')">立即创建</el-button>
        <el-button @click="resetForm('msgForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!--对话框-->
    <el-dialog v-el-drag-dialog title="请选择" :modal="false"  :visible.sync="dialogVisible">
      <userTree></userTree>
    </el-dialog>
  </div>

</template>

<script>
  import userTree from '../tree'
  import elDragDialog from '@/directive/el-dragDialog'

  export default {
    components: {
      userTree
    },
    directives: { elDragDialog },
    data() {
      return {
        msgForm: {
          mp_msg_id: null,
          mp_id: null,
          mp_tpl_id: null,
          mp_msg_content: {
            first: '标题',
            keyword1: '关键词1',
            keyword2: '关键词2',
            keyword3: '关键词3',
            remark: '备注信息'
          },
          mp_msg_touser: null,
          // mp_msg_crtu: null,
          mp_msg_crt: null
        },
        mpOptions: ['测试号', '服务号一', '服务号二'],
        tplOptions: ['付款成功通知', '结算通知'],
        dialogVisible: false,
        rules: {
          // name: [
          //   { required: true, message: '请输入活动名称', trigger: 'blur' },
          //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          // ],
          // region: [
          //   { required: true, message: '请选择活动区域', trigger: 'change' }
          // ],
          // date1: [
          //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          // ],
          // date2: [
          //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          // ],
          // type: [
          //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          // ],
          // resource: [
          //   { required: true, message: '请选择活动资源', trigger: 'change' }
          // ],
          // desc: [
          //   { required: true, message: '请填写活动形式', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!')
        //   } else {
        //     console.log('error submit!!')
        //     return false
        //   }
        // })
      },
      resetForm(formName) {
        // this.$refs[formName].resetFields()
      },
      showDialog() {
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>

</style>
