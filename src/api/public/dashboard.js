/*
 * @Author: your name
 * @Date: 2021-11-14 17:30:53
 * @LastEditTime: 2021-11-14 21:59:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zd-system-admin/src/api/public/dashboard.js
 */
import axios from "axios";

export function bathy() {
  return axios({
    url:
      "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/world.topo.bathy.200401.jpg",
    method: "get",
    params: {}
  });
}
export function starfield() {
  return axios({
    url:
      "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/starfield.jpg",
    method: "get",
    params: {}
  });
}
export function pisa() {
  return axios({
    url:
      "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/pisa.hdr",
    method: "get",
    params: {}
  });
}
export function linesBus() {
  return axios({
    url:
      "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/lines-bus.json",
    method: "get",
    params: {}
  });
}
