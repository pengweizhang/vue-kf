<template>
  <div class="app-container">
    <!--检索框-->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 600px;" placeholder = "请输入关键字" class="filter-item" v-model="listQuery.title">
      </el-input>
      <el-select  @click="handleFilter" clearable style="width: 120px" placeholder = "区域" class="filter-item" v-model="listQuery.searchArea" >
        <el-option v-for="area in areaOptions" :key="area" :label="area" :value="area">
        </el-option>
      </el-select>
      <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" >
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>-->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">检索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
     <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>
-->
    </div>

    <!--数据表-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{scope.row.bj_m_name}}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.bj_m_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域" align="center">
        <template slot-scope="scope">
          {{scope.row.bj_m_area}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.bj_m_create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--对话框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="用户" prop="bj_m_id">
          <el-input v-model="temp.bj_m_id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="bj_m_name">
          <el-input v-model="temp.bj_m_name"></el-input>
        </el-form-item>
        <el-form-item label=" 区域">
          <el-select class="filter-item" v-model="temp.bj_m_area" placeholder="请选择区域">
            <el-option v-for="item in  areaOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
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
  import waves from '@/directive/waves' // 水波纹指令
  import { getManager, addManager } from '@/api/manager'
  // import { parseTime } from '@/utils'

  export default {
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          title: '',
          type: undefined,
          sort: '+id',
          searchArea: null
        },
        areaOptions: [],
        temp: {
          bj_m_id: '',
          bj_m_name: '',
          bj_m_area: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '添加新用户'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          bj_m_id: [{ required: true, message: '请输入用户名', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          bj_m_name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }]
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      resetTemp() {
        this.temp = {
          bj_m_id: '',
          bj_m_name: '',
          bj_m_area: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.info(this.temp)
            addManager(this.temp).then(response => {
              console.info(response)
              this.temp = response.data
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      updateData() {},
      handleFilter() {
        this.listQuery.page = 1
        this.fetchData()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      },
      fetchData() {
        this.listLoading = true
        getManager(this.listQuery).then(response => {
          console.info(response)
          this.list = response.data.items
          this.total = response.data.total
          this.areaOptions = response.data.areaOptions
          this.listLoading = false
        })
      }
    }
  }
</script>

