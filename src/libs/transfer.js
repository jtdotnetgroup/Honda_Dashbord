// 
import http from "@/libs/axios";
// 
export function Post(url, param) {
    return GetPost(url, '/TransferApi/PostApiResult', 'POST', param);
}
// 
export function Get(url, param) {
    return GetPost(url, '/TransferApi/GetApiResult', 'GET', param);
}
// 
export function GetPost(url, TransferApi, method, param) {
    // 
    var strparam = '';
    for (const key in param) {
        if (param.hasOwnProperty(key)) {
            strparam += key + '=' + param[key] + "&";
        }
    }
    var params = {};
    var href = window.location.href
    if (href.indexOf('http://192.168.3') >= 0 || href.indexOf('localhost') >= 0) {
        params = { ApiUrl: encodeURI('http://localhost:3210/'+ url + '?' + strparam + "t=t") }
    } else {
        // 正式环境
        params = { ApiUrl: encodeURI('http://192.168.220.2/' + url + '?' + strparam + "t=t") };
    }
    // console.log(params.ApiUrl);
    return http({
        url: TransferApi,
        method: method,
        params
    });
}