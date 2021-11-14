<!--
 * @Author: your name
 * @Date: 2021-10-02 16:07:31
 * @LastEditTime: 2021-11-08 17:11:57
 * @LastEditors: Please set LastEditors
 * @Description: 权限管理
 * @FilePath: /zd-system-admin/src/views/project/authority_management/index.vue
-->
<template>
  <div class="container">
    <div class="container-Permissions-body">
      <el-card class="container-Permissions-body-left">
        <div slot="header" class="clearfix">
          <span>页面导航</span>
        </div>
        <div>
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" />

          <el-tree
            ref="tree"
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
          />
        </div>
      </el-card>
      <el-card class="container-Permissions-body-right">
        <div slot="header" class="clearfix">
          <span>页面权限</span>
        </div>
        <el-row class="buttonRow">
          <el-button type="success">新增</el-button>
          <el-button type="primary">编辑</el-button>
          <el-button type="info">查看</el-button>
          <el-button type="danger">删除</el-button>
        </el-row>
        <el-table
          :data="tableData"
          height="500"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="btmc"
            label="标题名称"
            width="180"
          />
          <el-table-column
            prop="gnmc"
            label="功能名称"
            width="180"
          />
          <el-table-column
            prop="gnlx"
            label="功能类型"
          />
          <el-table-column
            prop="gnicon"
            label="功能icon"
          />
          <el-table-column
            prop="gndi"
            label="功能地址"
          />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Permissions',
  data() {
    return {
      filterText: '',
      data: [
        {
          id: 1,
          label: '权限管理'
        },
        {
          id: 2,
          label: '公司体系'
        },
        {
          id: 3,
          label: '权限管理'
        },
        {
          id: 4,
          label: '部门结构'
        },
        {
          id: 5,
          label: '员工服务台'
        },
        {
          id: 6,
          label: '制度管理'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [{
        btmc: '新增',
        gnmc: 'permissionsInster',
        gnlx: 'inster',
        gnicon: 'el-icon-plus',
        gndi: '/Permissions/inster'
      }, {
        btmc: '编辑',
        gnmc: 'permissionsEditor',
        gnlx: 'editor',
        gnicon: 'el-icon-edit',
        gndi: '/permissions/editor'
      }, {
        btmc: '删除',
        gnmc: 'permissionsDelete',
        gnlx: 'delete',
        gnicon: 'el-icon-delete',
        gndi: '/permissions/delete'
      }, {
        btmc: '查看',
        gnmc: 'permissionsView',
        gnlx: 'view',
        gnicon: 'el-icon-view',
        gndi: '/permissions/view'
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container-Permissions-body {
  width: 100%;
  height: 100%;
  display: flex;

  .container-Permissions-body-left {
    width: 30%;
    margin-right: 5px;
  }

  .container-Permissions-body-right {
    width: calc(70% - 5px);
    .PermissionsTree{
      width:100%;
      height:100%;
    }
  }
  .container-Permissions-body-left,
  .container-Permissions-body-right {
    height: 100%;
  }
}
</style>
