import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
 
import { Overlay,Loading  } from 'vant'; 
Vue.use(Overlay).use(Loading);

import { GetList } from "@/libs/data.js"; 
Vue.config.productionTip = false 
Vue.prototype.$echarts = echarts 
Vue.prototype.$GetList = GetList

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
