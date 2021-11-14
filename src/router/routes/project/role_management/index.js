/*
 * @Author: your name
 * @Date: 2021-10-02 16:10:14
 * @LastEditTime: 2021-10-07 09:47:34
 * @LastEditors: Please set LastEditors
 * @Description: 角色管理
 * @FilePath: /zd-system-admin/src/router/routes/project/role_management/index.js
 */
import Layout from '@/views/public/layout'

const roleManagementRoutes = [
  {
    path: '/roleManagement',
    component: Layout,
    children: [{
      path: 'index',
      name: 'roleManagement',
      component: () => import('@/views/project/role_management/index'),
      meta: {
        title: '权限管理',
        icon: 'password'
      }
    }]
  }
  // {
  //   path: '/roleManagement',
  //   component: Layout,
  //   redirect: '/roleManagement/index',
  //   name: 'roleManagement',
  //   meta: {
  //     title: '角色管理',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'index',
  //     component: () => import('@/views/project/authority_management/index.vue'),
  //     meta: {
  //       title: '权限管理',
  //       icon: 'table'
  //     }
  //   },
  //   {
  //     path: 'WLK',
  //     name: 'WLK',
  //     component: () => import('@/views/project/authority_management/WLK.vue'),
  //     meta: {
  //       title: '团队活动',
  //       icon: 'tree'
  //     }
  //   }
  //   ]
  // }
]
export default roleManagementRoutes
