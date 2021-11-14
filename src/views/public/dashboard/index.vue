<!--
 * @Author: your name
 * @Date: 2021-07-22 20:17:03
 * @LastEditTime: 2021-11-14 23:33:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zd-system-admin/src/views/public/dashboard/index.vue
-->
<template>
  <!-- <div class="dashboard-text">指示版: {{ name }}</div> -->
  <div class="container">
    <div class="container-dashboard-body">
      <div class="container-dashboard-body-top">
        <div class="container-dashboard-body-top-left" ref="linesBus"></div>
        <div class="container-dashboard-body-top-center" ref="earth"></div>
        <div class="container-dashboard-body-top-right" ref="clock"></div>
      </div>
      <div class="container-dashboard-body-bottom"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import { bathy, starfield, pisa, linesBus } from "@/api/public/dashboard";

export default {
  name: "Dashboard",
  data() {
    return {
      bathyData: null,
      starfieldData: null,
      pisaData: null,
      linesBusData: null
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      try {
        this.bathyData = await bathy();
        this.starfieldData = await starfield();
        this.pisaData = await pisa();
        this.linesBusData = await linesBus();
        // await this.earthFun();
        // await this.linesBusFun();
        await this.clockFun();
      } catch (error) {
        await this.$message.error("获取数据失败");
      }
    },
    async earthFun() {
      const chartDom = await this.$refs.earth;
      const myChart = await echarts.init(chartDom);
      const option = await {
        backgroundColor: "#000",
        globe: {
          baseTexture: this.bathyData.data,
          heightTexture: this.bathyData.data,
          displacementScale: 0.04,
          shading: "realistic",
          environment: this.starfieldData.data,
          realisticMaterial: {
            roughness: 0.9
          },
          postEffect: {
            enable: true
          },
          light: {
            main: {
              intensity: 5,
              shadow: true
            },
            ambientCubemap: {
              texture: this.pisaData.data,
              diffuseIntensity: 0.2
            }
          }
        }
      };
      await this.setOption(myChart, option);
    },
    async linesBusFun() {
      const chartDom = await this.$refs.linesBus;
      const myChart = await echarts.init(chartDom);
      let hStep = 300 / (this.linesBusData.data.length - 1);
      let busLines = await [].concat.apply(
        [],
        this.linesBusData.data.map(function(busLine, idx) {
          let prevPt = [];
          let points = [];
          for (let i = 0; i < busLine.length; i += 2) {
            let pt = [busLine[i], busLine[i + 1]];
            if (i > 0) {
              pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]];
            }
            prevPt = pt;
            points.push([pt[0] / 1e4, pt[1] / 1e4]);
          }
          return {
            coords: points,
            lineStyle: {
              normal: {
                color: echarts.color.modifyHSL(
                  "#5A94DF",
                  Math.round(hStep * idx)
                )
              }
            }
          };
        })
      );
      const option = await {
        bmap: {
          center: [116.46, 39.92],
          zoom: 10,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#031628"
                }
              },
              {
                featureType: "land",
                elementType: "geometry",
                stylers: {
                  color: "#000102"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#0b3d51"
                }
              },
              {
                featureType: "local",
                elementType: "geometry",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#08304b"
                }
              },
              {
                featureType: "subway",
                elementType: "geometry",
                stylers: {
                  lightness: -70
                }
              },
              {
                featureType: "building",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#857f7f"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "building",
                elementType: "geometry",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "green",
                elementType: "geometry",
                stylers: {
                  color: "#062032"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#465b6c"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "label",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            type: "lines",
            coordinateSystem: "bmap",
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
              // color: '#c23531',
              // color: 'rgb(200, 35, 45)',
              opacity: 0.2,
              width: 1
            },
            progressiveThreshold: 500,
            progressive: 200
          },
          {
            type: "lines",
            coordinateSystem: "bmap",
            polyline: true,
            data: busLines,
            lineStyle: {
              width: 0
            },
            effect: {
              constantSpeed: 20,
              show: true,
              trailLength: 0.1,
              symbolSize: 1.5
            },
            zlevel: 1
          }
        ]
      };
      await this.setOption(myChart, option);
    },
    async clockFun() {
      const chartDom = await this.$refs.clock;
      const myChart = await echarts.init(chartDom);
      const option = await {
        series: [
          {
            name: "hour",
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            min: 0,
            max: 12,
            splitNumber: 12,
            clockwise: true,
            axisLine: {
              lineStyle: {
                width: 15,
                color: [[1, "rgba(0,0,0,0.7)"]],
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur: 15
              }
            },
            splitLine: {
              lineStyle: {
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 3,
                shadowOffsetX: 1,
                shadowOffsetY: 2
              }
            },
            axisLabel: {
              fontSize: 50,
              distance: 25,
              formatter: function(value) {
                if (value === 0) {
                  return "";
                }
                return value + "";
              }
            },
            anchor: {
              show: true,
              icon:
                "path://M532.8,70.8C532.8,70.8,532.8,70.8,532.8,70.8L532.8,70.8C532.7,70.8,532.8,70.8,532.8,70.8z M456.1,49.6c-2.2-6.2-8.1-10.6-15-10.6h-37.5v10.6h37.5l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3v0h-22.5c-1.5,0.1-3,0.4-4.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.8c-0.6,1.7-0.9,3.4-0.9,5.3v16h10.6v-16l0,0l0,0c0-2.7,2.1-5,4.7-5.3h10.3l10.4,21.2h11.8l-10.4-21.2h0c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3C457,53,456.7,51.2,456.1,49.6z M388.9,92.1h11.3L381,39h-3.6h-11.3L346.8,92v0h11.3l3.9-10.7h7.3h7.7l3.9-10.6h-7.7h-7.3l7.7-21.2v0L388.9,92.1z M301,38.9h-10.6v53.1H301V70.8h28.4l3.7-10.6H301V38.9zM333.2,38.9v10.6v10.7v31.9h10.6V38.9H333.2z M249.5,81.4L249.5,81.4L249.5,81.4c-2.9,0-5.3-2.4-5.3-5.3h0V54.9h0l0,0c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.9-10.6h-37.5c-1.9,0-3.6,0.3-5.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.7c-0.6,1.7-0.9,3.5-0.9,5.3l0,0v21.3c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.5,0.9,5.3,0.9h33.6l3.9-10.6H249.5z M176.8,38.9v10.6h49.6l3.9-10.6H176.8z M192.7,81.4L192.7,81.4L192.7,81.4c-2.9,0-5.3-2.4-5.3-5.3l0,0v-5.3h38.9l3.9-10.6h-53.4v10.6v5.3l0,0c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.4,0.9,5.3,0.9h23.4h10.2l3.9-10.6l0,0H192.7z M460.1,38.9v10.6h21.4v42.5h10.6V49.6h17.5l3.8-10.6H460.1z M541.6,68.2c-0.2,0.1-0.4,0.3-0.7,0.4C541.1,68.4,541.4,68.3,541.6,68.2L541.6,68.2z M554.3,60.2h-21.6v0l0,0c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.8-10.6h-37.5l0,0c-6.9,0-12.8,4.4-15,10.6c-0.6,1.7-0.9,3.5-0.9,5.3c0,1.9,0.3,3.7,0.9,5.3c2.2,6.2,8.1,10.6,15,10.6h21.6l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3l0,0h-37.5v10.6h37.5c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3c0-1.9-0.3-3.7-0.9-5.3C567.2,64.6,561.3,60.2,554.3,60.2z",
              showAbove: false,
              offsetCenter: [0, "-35%"],
              size: 120,
              keepAspect: true,
              itemStyle: {
                color: "#707177"
              }
            },
            pointer: {
              icon:
                "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
              width: 12,
              length: "55%",
              offsetCenter: [0, "8%"],
              itemStyle: {
                color: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4
              }
            },
            detail: {
              show: false
            },
            title: {
              offsetCenter: [0, "30%"]
            },
            data: [
              {
                value: 0
              }
            ]
          },
          {
            name: "minute",
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            min: 0,
            max: 60,
            clockwise: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              icon:
                "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
              width: 8,
              length: "70%",
              offsetCenter: [0, "8%"],
              itemStyle: {
                color: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4
              }
            },
            anchor: {
              show: true,
              size: 20,
              showAbove: false,
              itemStyle: {
                borderWidth: 15,
                borderColor: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4
              }
            },
            detail: {
              show: false
            },
            title: {
              offsetCenter: ["0%", "-40%"]
            },
            data: [
              {
                value: 0
              }
            ]
          },
          {
            name: "second",
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            min: 0,
            max: 60,
            animationEasingUpdate: "bounceOut",
            clockwise: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              icon:
                "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
              width: 4,
              length: "85%",
              offsetCenter: [0, "8%"],
              itemStyle: {
                color: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4
              }
            },
            anchor: {
              show: true,
              size: 15,
              showAbove: true,
              itemStyle: {
                color: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4
              }
            },
            detail: {
              show: false
            },
            title: {
              offsetCenter: ["0%", "-40%"]
            },
            data: [
              {
                value: 0
              }
            ]
          }
        ]
      };
      await setInterval(function() {
        var date = new Date();
        var second = date.getSeconds();
        var minute = date.getMinutes() + second / 60;
        var hour = (date.getHours() % 12) + minute / 60;
        option.animationDurationUpdate = 300;
        myChart.setOption({
          series: [
            {
              name: "hour",
              animation: hour !== 0,
              data: [{ value: hour }]
            },
            {
              name: "minute",
              animation: minute !== 0,
              data: [{ value: minute }]
            },
            {
              animation: second !== 0,
              name: "second",
              data: [{ value: second }]
            }
          ]
        });
      }, 1000);
      await this.setOption(myChart, option);
    },
    async setOption(chartRef, option) {
      try {
        console.log(chartRef, "chartRef", option);
        if (option) {
          await chartRef.setOption(option);
        }
      } catch (error) {
        await this.$message.error("图形数据错误!");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container-dashboard-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  .container-dashboard-body-top {
    height: 60%;
    margin-bottom: 5px;
    display: flex;
    .container-dashboard-body-top-left {
      width: calc(30% - 5px);
      margin-right: 5px;
    }
    .container-dashboard-body-top-center {
      width: 40%;
      margin-right: 5px;
    }
    .container-dashboard-body-top-right {
      width: calc(30% - 5px);
    }
  }
  .container-dashboard-body-bottom {
    height: calc(40% - 5px);
  }
}
</style>
