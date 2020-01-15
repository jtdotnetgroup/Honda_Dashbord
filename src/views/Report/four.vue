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
              v-for="(fit, index) in GetImgList(scope.row.fWorkerCode)"
              :key="Math.random() + fit"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="'http://192.168.1.112:8099/imges/' + fit + '.jpg'"
              ></el-image>
              <span
                class="demonstration"
                style="text-align: center;padding-right: 20px;"
                >{{ GetImgListName(index, scope.row.fworkerName) }}</span
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
  data() {
    return {
      value1: new Date(),
      tableData: []
    };
  }, //
  mounted() {
    this.OnSearch();
  },
  methods: {
    GetImgList(fWorkerCode) {
      var arr = (fWorkerCode + "").split(",");
      return arr;
    },
    GetImgListName(index, Name) { 
      var arr = (Name + "").split(",");
      console.log(arr+'_'+index);
      return arr[index];
    }, 
    OnSearch() {
      var _this = this;
      this.tableData = [];
      var obj = { dateTime: this.value1 };
      getAttendanceJson(obj).then(res => {
        console.log(res);
        if (res.data.IsSuccess) {
          var result = JSON.parse(res.data.Data);
          _this.tableData = result;
        }
      });
      window.scrollTo(0,window.screen.height);
    }
  }
};
</script>

<style lang="scss" scoped></style>
