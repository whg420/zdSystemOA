/*
 * @Author: your name
 * @Date: 2021-10-02 12:54:45
 * @LastEditTime: 2021-10-03 10:06:58
 * @LastEditors: Please set LastEditors
 * @Description: 员工服务台
 * @FilePath: /zd-system-admin/src/router/routes/project/staff_service_desk/index.js
 */
import Layout from '@/views/public/layout'

const staffServiceDeskRoutes = [{
  path: '/staffServiceDesk',
  component: Layout,
  children: [{
    path: 'index',
    name: 'staffServiceDesk',
    component: () => import('@/views/project/staff_service_desk/index'),
    meta: {
      title: '员工服务台',
      icon: 'el-icon-s-platform'
    }
  }]
}]
export default staffServiceDeskRoutes
