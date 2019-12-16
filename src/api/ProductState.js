import http from "@/libs/axios";
import MusicType from "@/assets/data/musictype.json"    // 所有线路 

export function GetAll(param) {
  var strparam = '';
  for (const key in param) {
    if (param.hasOwnProperty(key)) {
      strparam += key + '=' + param[key] + "&";
    }
  } 
  var params = {};
  var url = window.location.href
  if (url.indexOf('http://192.168.3') >= 0 || url.indexOf('localhost') >= 0) {
    params = { ApiUrl: encodeURI('http://localhost:53457/Test/GetHonda?' + strparam + "t=t") }
  } else {
    // 正式环境
    params = { ApiUrl: encodeURI('http://192.168.220.2/v20/Deptdevice/getDeviceDataList?' + strparam + "t=t") };
  }
  // console.log(params.ApiUrl);
  return http({
    url: '/TransferApi/GetApiResult',
    method: "GET",
    params
  });
}
// 
export async function All(params) {
  console.log(http)
  var datalist = [];

  let GetOBJList = [];
  MusicType.currentType.forEach(item => {
    params.sysid = item.id;
    GetOBJList.push(GetAll(params));
  });
  console.log(GetOBJList)
  await http.all(GetOBJList)
    .then(http.spread((peracctms) => {
      console.log(peracctms)

    }))
  return datalist;
}