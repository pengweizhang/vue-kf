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
            mp_tpl_id: null,
            mp_tpl_title: null,
            mp_tpl_crt: null
          },
          listQuery: {
            searchMp: null
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
        handleCreate() {},
        handleUpdate() {},
        handleModifyStatus() {}
      }
    }
</script>

<style scoped>

</style>
