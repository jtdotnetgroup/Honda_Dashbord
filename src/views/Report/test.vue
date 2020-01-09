<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
