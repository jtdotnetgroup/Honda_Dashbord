<template>
  <div id="app">
    <van-overlay :show="isLoad">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" type="spinner" color="#1989fa">加载中...</van-loading>
      </div>
    </van-overlay>
    <div id="myChart" :style="{width: '100%', height: '90vh'}"></div>
  </div>
</template>

<script>
import { GetAll, All } from "@/api/ProductState.js"; // 获取数据路径
import MusicType from "@/assets/data/musictype.json"; // 所有线路
export default {
  name: "hello",
  data() {
    return {
      intervals: 60*60, // 定时器 秒单位
      scale: 60 * 60,   // 刻度
      timer: "",
      datalist: [],
      isLoad: false,
      param: {
        sysid: "", // 产品id
        starttime: null, // 开始时间
        endtime: null, // 结束时间
        type: "5SECONDS", // 5秒间隔
        intervals: 5, // 时间轴间隔时间
        start: 0, // 滚动条开始位置
        end: 100 // 滚动条结束位置
      },
      Hour: 24,
      count: 0
    };
  },
  mounted() {
    this.LoadData();
    setInterval(this.getlog, this.intervals * 1000);
    setInterval(this.LoadData, this.intervals * 1000);
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    count: function(newQuestion) {
      if (newQuestion == MusicType.currentType.length * this.Hour) {
        this.LoadDataE(this.$GetList(this.datalist));
        this.isLoad = false;
      }
    }
    // datalist: function(newQuestion) {
    //   if (this.count === MusicType.currentType.length * this.Hour) {
    //     this.LoadDataE(this.$GetList(this.datalist));
    //   }
    // }
  },
  methods: {
    getlog() {
      console.log(1);
    },
    // 返回时间
    getdatastr(date) {
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        this.getzf(date.getDate()) +
        " " +
        this.getzf(date.getHours()) +
        ":" +
        this.getzf(date.getMinutes()) +
        ":" +
        this.getzf(date.getSeconds())
      );
    },
    // 补0
    getzf(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    },
    GetStartTime(j) {
      return this.getdatastr(new Date(new Date().getTime() + j));
    },
    GetEndTime(j) {
      return this.getdatastr(new Date(new Date().getTime() + j));
    },
    // 开始加载图表
    LoadData() {
      var _this = this;
      if (_this.isLoad) return;
      _this.isLoad = true;
      _this.datalist = [];
      var time = -1 * 60 * 60 * 1000;
      // _this.count = 48;
      //  _this.isLoad = false;
      // return;
      //
      _this.count = 0;
      for (var i = 1; i <= _this.Hour; i++) {
        // 遍历获取设备状态
        MusicType.currentType.forEach(item => {
          var params = JSON.parse(JSON.stringify(_this.param));
          params.starttime = _this.GetStartTime(time * i); // 开始时间
          params.endtime = _this.GetEndTime(time * (i - 1)); // 结束时间
          params.sysid = item.id;
          GetAll(params).then(res => {
            if (res.data.code == "0") {
              var result = _this.datalist.filter(f => {
                return f.id === item.id;
              });
              if (result.length > 0) {
                // result[0].list.concat(res.data.data);
                result[0].list.push.apply(result[0].list, res.data.data);
                // res.data.data.forEach(tmp => {
                //   result[0].list.concat(res.data.data);
                // });
              } else {
                _this.datalist.push({
                  id: item.id,
                  name: item.name,
                  list: res.data.data,
                  intervals: params.intervals
                });
              }
              _this.count++;
            }
          });
        });
      }
    },
    LoadDataE(result) {
      var _this = this;
      console.log(result);
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart")); //加载图形的div
      var colors = result.colors; //两种状态的颜色
      var state = result.state; //两种状态
      var y = result.y;
      // echart配置
      var option = {
        title: {
          text: "设备状态",
          left: "center"
        },
        color: colors,
        tooltip: {
          //提示框
          formatter: function(params) {
            return params.name + ":" + params.value[1] + "~" + params.value[2];
          } //数据的值
        },
        legend: {
          //图例
          data: state,
          bottom: "4%",
          selectedMode: false, // 图例设为不可点击
          textStyle: {
            color: "#000"
          }
        },
        dataZoom: [
          {
            type: "slider",
            filterMode: "weakFilter",
            showDataShadow: false,
            bottom: 10,
            height: 10,
            start: _this.param.start,
            end: _this.param.end,
            borderColor: "transparent",
            backgroundColor: "#e2e2e2",
            handleIcon:
              "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
            handleSize: 20,
            handleStyle: {
              shadowBlur: 6,
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowColor: "#aaa"
            },
            labelFormatter: ""
          },
          {
            type: "inside",
            filterMode: "weakFilter"
          }
        ],
        grid: {
          //绘图网格
          left: "3%",
          right: "3%",
          top: "5%",
          bottom: "10%",
          containLabel: true
        },
        axisLabel: {
          interval: 0, //代表显示所有x轴标签
          rotate: 35 //代表逆时针旋转45度
        },
        xAxis: {
          type: "time",
          interval: _this.scale * 1000,
          axisLabel: {
            // interval: 0, //代表显示所有x轴标签
            // rotate: 45, //代表逆时针旋转45度
            formatter: function(value) {
              var date = new Date(value);
              return (
                getzf(date.getHours()) +
                ":" +
                getzf(date.getMinutes()) +
                ":" +
                getzf(date.getSeconds()) +
                "\n" +
                (date.getMonth() + 1) +
                "/" +
                date.getDate() +
                " "
              );

              function getzf(num) {
                if (parseInt(num) < 10) {
                  num = "0" + num;
                }
                return num;
              }
            }
          }
        },
        yAxis: {
          data: y
        },
        series: [
          // 用空bar来显示四个图例
          {
            name: state[0],
            type: "bar",
            data: []
          },
          {
            name: state[1],
            type: "bar",
            data: []
          },
          {
            name: state[2],
            type: "bar",
            data: []
          },
          {
            type: "custom",
            renderItem: function(params, api) {
              //开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
              var categoryIndex = api.value(0); //这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
              var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
              var end = api.coord([api.value(2), categoryIndex]);
              var height = 24; //柱体宽度

              return {
                type: "rect", // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                shape: _this.$echarts.graphic.clipRectByRect(
                  {
                    // 矩形的位置和大小。
                    x: start[0],
                    y: start[1] - height / 2,
                    width: end[0] - start[0],
                    height: height
                  },
                  {
                    // 当前坐标系的包围盒。
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                  }
                ),
                style: api.style()
              };
            },
            encode: {
              x: [1, 2], // data 中『维度1』和『维度2』对应到 X 轴
              y: 0 // data 中『维度0』对应到 Y 轴
            },
            data: result.series
          }
        ]
      };
      myChart.setOption(option); //引用
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  }
};
</script>
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
