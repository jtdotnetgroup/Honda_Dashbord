import http from "@/libs/axios"; 
export function Login() {
    var params = {
        grant_type: 'company_credential',
        code: 'admin',
        password: 123456,
        captcha: 820322,
        country: 86,
    }
    return http({
        url: 'http://192.168.220.2/v20/Company/autorize',
        // url: 'https://receive.symacnc.cn/v20/Company/autorize',
        method: "post",
        params
    });
} 

export function Tests() {
    var params = {
        starttime: '2020-01-01',
        endtime: '2020-01-07',
        sysid: '11e9de67-3436-556c-8f92-0242ac110004'
    }
    return http({
        url: 'http://192.168.220.2/v20/Report/getDeviceAlarmList?grant_type=company_credential&access_token=NekmZiGcMrzoQe5mNiDckrtoQURBQy01NjYzLUY0NDAtNERFNjExMUVFMUVDMTFlOGE0MjgtNTIzZi0zYzc5LTliM2ItMDAxNjNlMDA4MDI3NERGQ0MzOUEtN0NCMy01MDM5LUE1ODYtN0M2QzNDQzlCRjQ1',
        method: "Post",
        params
    });
} 
