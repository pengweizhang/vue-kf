<template>
  <div class="app-container">

    <!--检索框-->
    <div class="filter-container">
      <el-select  @click="handleFilter" style="width: 30%" placeholder = "请选择公众号名称" class="filter-item" v-model="listQuery.searchMp" >
        <template slot="prepend">Http://</template>
        <el-option v-for="mp in mpOptions" :key="mp" :label="mp" :value="mp">
        </el-option>
      </el-select>
      <el-button type="primary"  @click="handleCreate()">新建模板消息</el-button>
    </div>

    <!--数据表-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
    <el-table-column align="center" label='序号' width="95">
      <template slot-scope="scope">
        {{scope.$index + 1}}
      </template>
    </el-table-column>
    <el-table-column label="模板ID">
      <template slot-scope="scope">
        {{scope.row.mp_tpl_id}}
      </template>
    </el-table-column>
    <el-table-column label="标题" align="center">
      <template slot-scope="scope">
        <span>{{scope.row.mp_tpl_title}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="created_at" label="创建时间" width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span>{{scope.row.mp_tpl_crt}}</span>
      </template>
    </el-table-column>

    <el-table-column label="" width="200" align="center">

      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
        <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!--对话框-->
    <el-dialog :title="dialogTitles[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item class="tpl-form-item" label="公众号">
          <el-select class="filter-item" v-model="temp.mp_id" placeholder="请选择微信公众号">
            <el-option v-for="item in  mpOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="tpl-form-item" label="标题" prop="mp_tpl_title">
          <el-input v-model="temp.mp_tpl_title"></el-input>
        </el-form-item>
        <el-form-item class="tpl-form-item" label="内容" prop="mp_tpl_content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 15}"
            placeholder="请输入内容"
            v-model="temp.mp_tpl_content">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">提交</el-button>
        <el-button v-else type="primary" @click="updateData">提交</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
    export default {
      name: '',
      data() {
        return {
          listLoading: true,
          list: null,
          mpOptions: ['测试号', '服务号一', '服务号二'],
          temp: {
            mp_id: null,
            mp_tpl_id: null,
            mp_tpl_title: null,
            mp_tpl_content: null,
            mp_tpl_crt: null
          },
          listQuery: {
            searchMp: null
          },
          dialogFormVisible: false,
          dialogStatus: 'create',
          dialogTitles: {
            create: '新建模板消息',
            update: '修改模板消息'
          }
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          this.listLoading = false
          this.list = [{
            mp_tpl_id: '11111111111111111111111',
            mp_tpl_title: '消费提醒模板消息',
            mp_tpl_crt: '2018-07-02 16:00'
          }]
        },
        handleFilter() {
          this.listQuery.page = 1
          this.fetchData()
        },
        handleCreate() {
          this.dialogStatus = 'create'
          this.dialogFormVisible = true
          this.temp.mp_id = null
          this.temp.mp_tpl_id = null
          this.temp.mp_tpl_title = null
          this.temp.mp_tpl_content = null
          this.temp.mp_tpl_crt = null
        },
        handleUpdate: function(row) {
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.temp.mp_id = this.listQuery.searchMp
          this.temp.mp_tpl_id = row.mp_tpl_id
          this.temp.mp_tpl_title = row.mp_tpl_title
          this.temp.mp_tpl_content = row.mp_tpl_content
          this.temp.mp_tpl_crt = row.mp_tpl_crt
        },
        handleModifyStatus() {}
      }
    }
</script>

<style scoped>
  .tpl-form-item {
    width: 150%;
  }
  .filter-item{
    width: 100%;
  }
</style>
