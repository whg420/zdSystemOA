/*
 * @Author: your name
 * @Date: 2021-08-16 13:31:44
 * @LastEditTime: 2021-09-20 18:20:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zd-system-admin/src/router/routes/index.js
 */
const genRoutesFunc = modulesFiles => {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath)
    if (value.default) {
      modules = modules.concat(value.default)
    }
    return modules
  }, [])
  return modules
}
// public目录下
const publicRoutes = genRoutesFunc(require.context('./public', true, /\.js$/))
// project目录下
const projectRoutes = genRoutesFunc(
  require.context('./project', true, /\.js$/)
)
// // 数据支撑系统目录下
// const dataSupportSystemRoutes = genRoutesFunc(
//   require.context('./project/dataSupportSystem', true, /\.js$/)
// )
// // 蜂窝UI目录下
// const phoneycombUIRoutes = genRoutesFunc(
//   require.context('./project/honeycombUI', true, /\.js$/)
// )
// 其他目录下
const otherRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
const routes = [
  ...publicRoutes,
  ...projectRoutes,
  // ...dataSupportSystemRoutes,
  // ...phoneycombUIRoutes,
  ...otherRoutes
]
export default routes
