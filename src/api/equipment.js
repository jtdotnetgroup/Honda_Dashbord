import http from "@/libs/axios";
 
// （产品线路）图一，图二，图三
export function getListInfo(params) { 
    return http({
        url: 'http://192.168.220.2/v20/Dept/getListInfo',
        method: "Post",
        params
    });
} 

// 图一
export function getDevicesUseanalysis(params) { 
    return http({
        url: 'http://192.168.220.2/v20/Report/getDevicesUseanalysis',
        method: "Post",
        params
    });
} 
// 图二
export function getDeviceAlarmList(params) { 
    return http({
        url: 'http://192.168.220.2/v20/Report/getDeviceAlarmList',
        method: "Post",
        params
    });
} 
// 图三
export function getTotalAlarmListByDevices(params) { 
    return http({
        url: 'http://192.168.220.2/v20/Report/getTotalAlarmListByDevices',
        method: "Post",
        params
    });
} 

// 图四
export function getAttendanceJson(params) { 
    return http({
        url: 'http://192.168.1.112:8099/ApiData/AttendanceJson',
        method: "Post",
        params
    });
} 