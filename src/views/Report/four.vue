<template>
  <div>
    <div style="padding:15px;">
      <span class="demonstration">日期： </span>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-button type="primary" @click="OnSearch">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="fForgeLine"
        label="工序"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="fproductname"
        label="产品"
        width="120"
      ></el-table-column>
      <el-table-column prop="name" label="人员">
        <template slot-scope="scope">
          <div class="demo-image">
            <div
              class="block"
              style="display: inline-grid;"
              v-for="fit in GetImgList(scope.row.fWorkerCodefworkerName)"
              :key="Math.random() + fit.fWorkerCode"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="
                  'http://192.168.1.112:8099/imges/' + fit.fWorkerCode + '.jpg'
                "
              ></el-image>
              <span
                class="demonstration"
                style="text-align: center;padding-right: 20px;"
                >{{ fit.fworkerName }}</span
              >
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAttendanceJson } from "@/api/equipment.js"; // 获取数据路径

export default {
  name: "Attendance",
  data() {
    return {
      value1: new Date(),
      tableData: [],
      scrollType: "top", // 滚动类型
      scrollHeight: 0, // 当前滚动到的位置
      documentHeight: 0, // 滚动条高度
      scrollIndex: 1, // 滚动页数
      isScroll: true // 是否开启滚动条
    };
  }, //
  mounted() {
    var timer = null;
    var _this = this;
    window.onmousemove = function() {
      _this.isScroll = false;
      clearTimeout(timer);
      // console.log(this.isScroll); // 移动时
      timer = setTimeout(function() {
        _this.isScroll = true;
        // console.log(this.isScroll); // 静止后
      }, 10000);
    };
    this.OnSearch();
  },
  methods: {
    GetImgList(fWorkerCodefworkerName) {
      var arr = (fWorkerCodefworkerName + "").split(",");
      var list = [];
      arr.forEach(f => {
        if (f.length > 0) {
          var obj = {};
          obj.fWorkerCode = f.split("|")[0];
          obj.fworkerName = f.split("|")[1];
          list.push(obj);
        }
      });
      console.log(list);
      return list;
    },
    OnSearch() {
      var _this = this;
      this.tableData = [];
      var obj = { dateTime: this.value1 };
      getAttendanceJson(obj).then(res => {
        // console.log(res);
        if (res.data.IsSuccess) {
          var result = JSON.parse(res.data.Data);
          _this.tableData = result.Table;
          _this.documentHeight = document.documentElement.scrollHeight;
        }
      });
    },
    tz() {
      window.scrollTo(0, 0);
      // console.log(document.documentElement.scrollHeight);
    }
  },
  watch: {
    scrollIndex: function(val) {
      var clientHeight = document.documentElement.clientHeight;
      if (val * clientHeight - this.documentHeight > this.documentHeight) {
        this.scrollIndex = 0;
      }
      if (this.isScroll) {
        window.scrollTo(0, val * clientHeight);
      }
    },
    documentHeight: function(val) {
      //  setTimeout(function() {
      //    console.log(1)
      //  },1000)
      this.scrollIndex = 0;
      var _this = this;
      setInterval(function() {
        _this.scrollIndex++;
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped></style>
