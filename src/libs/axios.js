import axios from "axios";

// 开发环境
var baseURL = "";
// baseURL = "http://192.168.1.234:8080";
// baseURL = "http://192.168.1.222";
// baseURL = "http://192.168.1.203:8080";
// baseURL = "http://192.168.1.165:8080/jitcrm";

var url = window.location.href
if (url.indexOf('http://192.168.3') >= 0 || url.indexOf('localhost') >= 0) {
  baseURL = "http://localhost:53457";
} else {
  // 正式环境
  baseURL = "http://192.168.1.112:8099";
} 
// 
const http = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
http.all = axios.all;
http.spread = axios.spread;
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default http