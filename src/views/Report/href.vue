<template>
  <div v-loading.fullscreen.lock="GetSrcYes">
    <iframe
      :src="GetSrc"
      id="main"
      name="main"
      style="width:100%;border: 0px;position: fixed;top: 0;left: 0px;
    height: -webkit-fill-available;"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      href: "",
      access_token: "",
      intervals: 60 * 20,
      Getaccess_token: 1
    };
  },
  mounted() {
    this.InitData();
  }, // 所有方法
  methods: {
    InitData() {
      this.$store.dispatch("account/GetToken").then(() => {});
      setInterval(() => {
        window.location.reload();
      }, this.intervals * 1000);
      setInterval(() => {
        this.Getaccess_token = 0;
      }, 2 * 1000);
    }
  },
  computed: {
    // 计算属性的 getter
    GetSrc() {
      var _this = this;
      _this.href = _this.$route.query.href + "";
      _this.href = _this.href.replace("{$GRANTTYPE$}", "company_credential");
      _this.href = _this.href.replace("{$ACCESSTOKEN$}", _this.access_token);
      // `this` 指向 vm 实例
      return _this.href;
    },
    GetSrcYes() {
      return this.href === "";
    },
    token() {
      this.access_token = localStorage.getItem("token");
      return this.$store.state.account.getters.token;
    }
  },
  watch: {
    Getaccess_token: function(val) {
      this.access_token = localStorage.getItem("token");
    }
  }
};
</script>

<style lang="scss" scoped></style>
