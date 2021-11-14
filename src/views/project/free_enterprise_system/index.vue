<!--
 * @Author: your name
 * @Date: 2021-10-02 08:44:37
 * @LastEditTime: 2021-11-14 17:04:54
 * @LastEditors: Please set LastEditors
 * @Description: 公司体系
 * @FilePath: /zd-system-admin/src/views/project/freeEnterpriseSystem/index.vue
-->
<template>
  <div class="container">
    <div class="container-company-body">
      <el-card class="container-company-body-left">
        <div slot="header" class="clearfix">
          <span>公司管理体系</span>
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
      <el-card class="container-company-body-right">
        <div slot="header" class="clearfix">
          <span>组织机构图</span>
        </div>
        <div ref="companyTree" class="companyTree" />
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'

export default {
  name: 'Company',
  data() {
    return {
      filterText: '',
      data: [
        {
          id: 1,
          label: '董事长',
          children: [
            {
              id: 2,
              label: '总经理',
              children: [
                {
                  id: 3,
                  label: '行政部'
                },
                {
                  id: 4,
                  label: '财务部',
                  children: [
                    {
                      id: 10,
                      label: '库房'
                    }
                  ]
                },
                {
                  id: 5,
                  label: '销售部'
                },
                {
                  id: 6,
                  label: '质量部'
                },
                {
                  id: 7,
                  label: '生产部'
                },
                {
                  id: 8,
                  label: '技术部'
                },
                {
                  id: 9,
                  label: '采购部'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      axios.get('https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/flare.json')
        .then((response) => {
          var dom = this.$refs.companyTree
          var myChart = echarts.init(dom)
          var option
          option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            series: [
              {
                type: 'tree',
                data: [response.data],
                left: '2%',
                right: '2%',
                top: '8%',
                bottom: '20%',
                symbol: 'emptyCircle',
                orient: 'vertical',
                expandAndCollapse: true,
                label: {
                  position: 'top',
                  rotate: -90,
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 9
                },
                leaves: {
                  label: {
                    position: 'bottom',
                    rotate: -90,
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                },
                animationDurationUpdate: 750
              }
            ]
          }
          option && myChart.setOption(option)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
.container-company-body {
  width: 100%;
  height: 100%;
  display: flex;

  .container-company-body-left {
    width: 30%;
    margin-right: 5px;
  }

  .container-company-body-right {
    width: calc(70% - 5px);
    .companyTree{
      width:100%;
      height:100%;
    }
  }
  .container-company-body-left,
  .container-company-body-right {
    height: 100%;
  }
}
</style>
