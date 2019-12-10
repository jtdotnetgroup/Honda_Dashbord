import http from "@/libs/axios";
import MusicType from "@/assets/data/musictype.json"    // 所有线路 

export function GetAll(params) {
  return http({
    url: '/v20/Deptdevice/getDeviceDataList',
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