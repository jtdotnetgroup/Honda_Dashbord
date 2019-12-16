import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts' 
import ElementUI from 'element-ui';

import { Overlay, Loading, DatetimePicker } from 'vant';
Vue.use(Overlay).use(Loading).use(DatetimePicker).use(ElementUI);

import { GetList } from "@/libs/data.js";
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$GetList = GetList

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
