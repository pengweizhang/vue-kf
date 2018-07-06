<template>
  <div class="app-container">
    <!--树形图-->
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span><el-button type="text" size="mini" @click="() => showDialog(data,node)">{{ data.name }}</el-button></span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>

    <!--对话框-->
    <el-dialog title="详细信息" :visible.sync="dialogVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
        <el-form-item label="request">
          <el-input v-model="temp.request"></el-input>
        </el-form-item>
        <el-form-item label="code">
          <el-input v-model="temp.code"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row v-if="dialogStatus=='detail'">
          <el-button type="primary" @click="append">添加</el-button>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="remove">移除</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-row>
        <el-row v-if="dialogStatus=='append'">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-row>


      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filterText: '',
        dialogVisible: false,
        dialogStatus: 'detail',
        data: [
          {
            'children': [
              {
                'children': [
                  {
                    'children': [],
                    'code': 'user_add',
                    'id': 3,
                    'levels': 3,
                    'name': '添加用户',
                    'num': 1,
                    'permission': 'usre:add',
                    'pid': 2,
                    'request': 'post',
                    'status': 1,
                    'type': 2,
                    'url': '/users'
                  },
                  {
                    'children': [],
                    'code': 'user_update',
                    'id': 5,
                    'levels': 3,
                    'name': '修改用户',
                    'num': 2,
                    'permission': 'usre:update',
                    'pid': 2,
                    'request': 'put',
                    'status': 1,
                    'type': 2,
                    'url': '/users'
                  }
                ],
                'code': 'user',
                'icon': '',
                'id': 2,
                'isOpen': 0,
                'levels': 2,
                'name': '用户管理',
                'num': 1,
                'permission': 'user:view',
                'pid': 1,
                'request': 'get',
                'status': 1,
                'type': 1,
                'url': '/users'
              },
              {
                'children': [
                  {
                    'children': [],
                    'code': 'role',
                    'id': 7,
                    'levels': 3,
                    'name': '添加角色',
                    'num': 1,
                    'permission': 'role:add',
                    'pid': 6,
                    'request': 'post',
                    'status': 1,
                    'type': 2,
                    'url': '/roles'
                  }
                ],
                'code': 'role',
                'id': 6,
                'levels': 2,
                'name': '角色管理',
                'num': 1,
                'permission': 'user:view',
                'pid': 1,
                'request': 'get',
                'status': 1,
                'type': 1,
                'url': '/roles'
              }
            ],
            'code': 'system',
            'icon': 'fa-user',
            'id': 1,
            'isOpen': 1,
            'levels': 1,
            'name': '系统管理',
            'num': 1,
            'permission': '#',
            'pid': 0,
            'status': 1,
            'type': 1,
            'url': '/sys'
          },
          {
            'children': [],
            'code': 'swagger',
            'id': 8,
            'levels': 1,
            'name': '接口文档',
            'num': 2,
            'pid': 0,
            'request': 'get',
            'status': 1,
            'type': 1,
            'url': '/swagger-ui.html'
          },
          {
            'children': [
              {
                'children': [],
                'code': 'druid',
                'id': 10,
                'levels': 3,
                'name': 'druid监控',
                'num': 1,
                'pid': 9,
                'status': 1,
                'type': 1,
                'url': '/druid/index.html'
              }
            ],
            'code': 'monitor',
            'id': 9,
            'levels': 1,
            'name': '监控',
            'num': 3,
            'pid': 0,
            'status': 1,
            'type': 1
          }
        ],
        temp: {
          'code': '',
          'id': '',
          'levels': '',
          'name': '',
          'num': '',
          'permission': '',
          'pid': '',
          'request': '',
          'status': '',
          'type': '',
          'url': ''
        },
        tempNode: null,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      showDialog(data, node) {
        this.dialogVisible = true
        this.temp = data
        this.tempNode = node
      },
      save() {
        console.info(this.temp)
        this.dialogVisible = false
        this.dialogStatus = 'detail'
      },
      append() {
        const newChild = {
          'code': '',
          'id': '',
          'levels': '',
          'name': '',
          'num': '',
          'permission': '',
          'pid': '',
          'request': '',
          'status': '',
          'type': '',
          'url': ''
        }
        if (!this.temp.children) {
          this.$set(this.temp, 'children', [])
        }
        this.temp.children.push(newChild)
        this.temp = newChild
        this.dialogStatus = 'append'
      },
      cancel() {
        const parent = this.tempNode
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === this.temp.id)
        children.splice(index, 1)
        this.dialogVisible = false
        this.dialogStatus = 'detail'
      },
      remove(node, data) {
        console.info(node)
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }
    }
  }
</script>

