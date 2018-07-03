<template>
  <div class="app-container">
    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column label="公众号">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.mp_name"></el-input>
          </template>
          <span v-else>{{ scope.row.mp_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="appID">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.mp_appid"></el-input>
          </template>
          <span v-else>{{ scope.row.mp_appid }}</span>
        </template>
      </el-table-column>

      <el-table-column label="appSecret">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.mp_appsecret"></el-input>

          </template>
          <span v-else>{{ scope.row.mp_appsecret }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.mp_mdftime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small"
                     icon="el-icon-circle-check-outline">Ok
          </el-button>
          <el-button v-if="scope.row.edit" class='cancel-btn' size="small" icon="el-icon-refresh" type="warning"
                     @click="cancelEdit(scope.row)">cancel
          </el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">
            Edit
          </el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>

</template>

<script>
  export default {
    name: '',
    data: function() {
      return {
        list: null,
        listLoading: true
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = false
        this.list = [{
          mp_name: '测试号',
          mp_appid: 'wxfc47562eae8ff5a7',
          mp_appsecret: 'ce232baa055484cabb049b16b0b97f9d',
          mp_mdftime: '2018-07-02 17:02:32.450'
        }]
        this.list = this.list.map(v => {
          this.$set(v, 'edit', false)
          v.or_mp_name = v.mp_name
          v.or_mp_appid = v.mp_appid
          v.or_mp_appsecret = v.mp_appsecret
          return v
        })
      },
      cancelEdit(row) {
        row.title = row.originalTitle
        row.edit = false
        this.$message({
          message: 'The title has been restored to the original value',
          type: 'warning'
        })
      },
      confirmEdit(row) {
        row.edit = false
        row.originalTitle = row.title
        this.$message({
          message: 'The title has been edited',
          type: 'success'
        })
      }
    }
  }
</script>

<style scoped>

</style>
