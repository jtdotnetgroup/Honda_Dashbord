<template>
  <div id="app">
    <!-- 加载框 -->
    <van-overlay :show="isLoad">
      <div class="wrapper">
        <van-loading size="24px" type="spinner" color="#1989fa">加载中({{showPercentage}}%)...</van-loading>
      </div>
    </van-overlay>
    <!-- 定时刷新秒数 -->
    <el-input-number
      v-model="intervals"
      @change="handleChange"
      :min="60"
      :max="3600"
      :step="10"
      label="描述文字"
      style="position: fixed;top: 15px;right: 180px;"
      size="mini"
      :disabled="checked"
    >></el-input-number>
    <el-switch
      v-model="checked"
      active-color="#13ce66"
      inactive-text="秒"
      active-text="是否定时刷新"
      style="position: fixed;top: 18px;right: 15px;"
    ></el-switch>
    <!-- 查询范围 -->
    <el-date-picker
      v-model="startend"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="margin:0px 10px;"
      @change="changeDate"
      format="yyyy-MM-dd HH:mm:ss"
    ></el-date-picker>
    <el-button type="primary" round @click="search" :disabled="startend==null">查询</el-button>
    <!-- 增加高度 -->
    <div>
      &nbsp;
      <br />
      <hr />
      <br />
    </div>
    <!-- 显示Echarts -->
    <div id="myChart" :style="{width: '100%', height: '80vh'}"></div>
  </div>
</template>
<!-- 脚本 -->
<script>
import { GetAll, All } from "@/api/ProductState.js"; // 获取数据路径
import MusicType from "@/assets/data/musictype.json"; // 所有线路
export default {
  name: "hello",
  data() {
    return {
      startend: null, // 搜索范围日期
      checked: false, // 是否定时刷新
      intervals: 60*60, // 定时器 秒单位
      timer: null, // 定时器名称
      scale: 60 * 60, // 刻度
      datalist: [], // 访问回来得到的数据
      isLoad: false, // 是否显示加载框
      param: {
        sysid: "", // 产品id
        starttime: null, // 开始时间
        endtime: null, // 结束时间
        type: "5SECONDS", // 5秒间隔
        intervals: 5 // 时间轴间隔时间
      },
      dataZoomstart: 0, // 滚动条开始位置
      dataZoomend: 100, // 滚动条结束位置
      Hour: 24, // 查询多少时间
      count: 0, // 已经访问总条数
      searchcount: 0, // （搜索）已经访问总条数
      MusicTypeCount: MusicType.currentType.length, // 产品线的条数
      showPercentage: "", // 加载状态
      result: null, // 返回结果
      dateList: [] // 查询的日期List
    };
  },
  //
  mounted() {
    this.LoadData();
  },
  // 监听变量值
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    // 获取数据条数
    count: function(newQuestion) {
      // 加载信息
      this.showPercentage = parseFloat(
        (newQuestion / (this.MusicTypeCount * this.Hour)) * 100
      ).toFixed(2);
      // 加载完毕开始填充Echarts
      if (newQuestion == MusicType.currentType.length * this.Hour) {
        //
        this.LoadDataE(this.$GetList(this.datalist));
        this.isLoad = false;
        this.checked = true;
      }
    },
    // 定时刷新按钮事件
    checked: function(newQuestion) {
      if (newQuestion) {
        this.timer = setInterval(() => {
          this.LoadData();
        }, this.intervals * 1000);
      } else { 
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    searchcount: function(newQuestion) {
      // 加载信息
      this.showPercentage = parseFloat(
        (newQuestion / (this.MusicTypeCount * this.dateList.length)) * 100
      ).toFixed(2);
      // 加载完毕开始填充Echarts
      if (newQuestion == MusicType.currentType.length * this.dateList.length) {
        //
        this.LoadDataE(this.$GetList(this.datalist));
        this.isLoad = false;
      }
    }
  },
  // 所有方法
  methods: {
    // 切换时间
    changeDate(value) {
      const start = new Date(value[0]);
      const end = new Date(value[1]);
      var time = new Date();
      if (time.getTime() < end.getTime()) {
        end.setTime(time.getTime());
      }
      if (start.getTime() > end.getTime()) {
        start.setTime(end.getTime() - 24 * 60 * 60 * 1000);
      }
      this.startend = [this.getdatastr(start), this.getdatastr(end)];
      //
      this.dateList = [];
      this.getdatelist(start.getTime(), end.getTime());
    },
    // 递归生成查询日期List
    getdatelist(start, end) {
      var time = 24 * 60 * 60 * 1000;
      if (end - start > time) {
        this.dateList.push({
          start: this.getdatastr(new Date(start)),
          end: this.getdatastr(new Date(start + time))
        });
        this.getdatelist(start + time, end);
      } else {
        this.dateList.push({
          start: this.getdatastr(new Date(start)),
          end: this.getdatastr(new Date(end))
        });
      }
    },
    // 搜索
    search() {
      var _this = this;
      _this.checked = false;
      if (_this.isLoad) return;
      _this.isLoad = true;
      _this.datalist = [];
      // _this.count = 48;
      //  _this.isLoad = false;
      // return;
      //
      _this.searchcount = 0;
      for (var i = 0; i < _this.dateList.length; i++) {
        // 遍历获取设备状态
        MusicType.currentType.forEach(item => {
          var params = JSON.parse(JSON.stringify(_this.param));
          params.starttime = _this.dateList[i].start; // 开始时间
          params.endtime = _this.dateList[i].end; // 结束时间
          params.sysid = item.id;
          // 获取数据
          GetAll(params)
            .then(res => {
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
                _this.searchcount++;
              }
            })
            .catch(err => {
              _this.searchcount++;
            });
        });
      }
    },
    // 切换秒数
    handleChange() {},
    // 返回时间
    getdatastr(date) {
      return (
        date.getFullYear() +
        "-" +
        this.getzf(date.getMonth() + 1) +
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
    // 开始时间
    GetStartTime(j) {
      return this.getdatastr(new Date(new Date().getTime() + j));
    },
    // 结束时间
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
          // 获取数据
          GetAll(params)
            .then(res => {
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
            })
            .catch(err => {
              _this.count++;
            });
        });
      }
    },
    // 填充echarts
    LoadDataE(result) {
      // this.result = result;
      var _this = this;
      // console.log(result);
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart")); //加载图形的div
      var colors = result.colors; //两种状态的颜色
      var state = result.state; //两种状态
      var y = result.y;

      // echart配置
      var option = {
        title: {
          text: "设备状态                 ",
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
            start: _this.dataZoomstart,
            end: _this.dataZoomend,
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
          data: y,
          axisLabel: {
            textStyle: {
              fontWeight: 700
            }
          }
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
<!-- 样式脚本 -->
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
