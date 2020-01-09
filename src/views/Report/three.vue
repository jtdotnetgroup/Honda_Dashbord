<template>
  <div style="padding:15px;">
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>稼动率报表</el-breadcrumb-item>
          </el-breadcrumb>
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24" style="text-align:left;" class="p15">
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="查询类型">
            <el-radio-group v-model="form.resource">
              <el-radio label="设备"></el-radio>
              <el-radio label="设备组"></el-radio>
            </el-radio-group>
          </el-form-item> 
          <el-form-item label="设备" prop="region">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-button type="primary">查询</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      radio: "1",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
