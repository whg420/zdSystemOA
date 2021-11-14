/*
 * @Author: your name
 * @Date: 2021-07-22 20:17:03
 * @LastEditTime: 2021-11-07 20:14:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /zd-system-admin/src/api/table.js
 */
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/zd-system-admin/table/list',
    method: 'get',
    params
  })
}

// export function getList(params) {
//   return request({
//     url: '/zd-system-admin/table/list',
//     method: 'get',
//     params
//   })
// }
