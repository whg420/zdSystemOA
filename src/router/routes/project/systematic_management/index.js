/*
 * @Author: your name
 * @Date: 2021-10-02 16:04:53
 * @LastEditTime: 2021-10-02 16:06:13
 * @LastEditors: Please set LastEditors
 * @Description: 制度管理
 * @FilePath: /zd-system-admin/src/router/routes/project/systematic_management/index.js
 */
import Layout from '@/views/public/layout'

const systematicManagementRoutes = [{
  path: '/systematicManagement',
  component: Layout,
  children: [{
    path: 'index',
    name: 'systematicManagement',
    component: () => import('@/views/project/systematic_management/index'),
    meta: {
      title: '制度管理',
      icon: 'el-icon-s-help'
    }
  }]
}]
export default systematicManagementRoutes
