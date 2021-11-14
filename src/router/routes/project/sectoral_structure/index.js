/*
 * @Author: your name
 * @Date: 2021-10-02 08:39:01
 * @LastEditTime: 2021-10-02 21:46:04
 * @LastEditors: Please set LastEditors
 * @Description: 部门领导
 * @FilePath: /zd-system-admin/src/router/routes/project/sectoral_structure/index.js
 */
import Layout from '@/views/public/layout'

const sectoralStructureRoutes = [{
  path: '/sectoralStructure',
  component: Layout,
  children: [{
    path: 'index',
    name: 'sectoralStructure',
    component: () => import('@/views/project/sectoral_structure/index'),
    meta: {
      title: '部门结构',
      icon: 'table'
    }
  }]
}]
export default sectoralStructureRoutes
