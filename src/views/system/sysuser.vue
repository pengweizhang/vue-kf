<!--
<template>

  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="addMenu">添加</el-button>
      <el-button type="primary">修改</el-button>
      <el-button type="primary">删除</el-button>
    </el-row>
    <el-tree
      :data="data"
      show-checkbox
      :default-expanded-keys="[0]"
      node-key="id"
      ref="menutree"
      highlight-current
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
  import { getPermission } from '@/api/system'
  export default {
    data() {
      return {
        filterText: '',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    created() {
      this.getMenuList()
    },
    methods: {
      getMenuList: function() {
        getPermission().then(response => {
          console.log('获取菜单')
          console.info(response)
          this.data = response.data
        })
      },
      addMenu: function() { }
    }
  }
</script>

-->
