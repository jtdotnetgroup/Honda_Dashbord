import http from "@/libs/axios";
export function Login() {
    var params = {
        grant_type: company_credential,
        code: admin,
        password: 123456,
        captcha: 820322,
        country: 86,
    }
    return http({
        url: 'http://192.168.220.2/v20/Company/autorize',
        method: "Post",
        params
    });
} 
