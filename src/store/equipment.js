import { getListInfo, getDevicesUseanalysis, getDeviceAlarmList, getTotalAlarmListByDevices } from "@/api/equipment";

const state = {
    access_token: ''
};

const mutations = {
    GETLISTINFO: (state, payload) => {
        state.access_token = payload;
    }, GETDEVICESUSEANALYSIS: (state, payload) => {
        state.access_token = payload;
    }, GETDEVICEALARMLIST: (state, payload) => {
        state.access_token = payload;
    }, GETTOTALALARMLISTBYDEVICES: (state, payload) => {
        state.access_token = payload;
    }
};

const actions = {
    async GETLISTINFO(context, params) {
        let result;
        return await getListInfo(params)
            .then(res => {
                result = res.data.data;
                context.commit("GETLISTINFO", result);
                return result;
            })
            .catch(err => {
                result = err;
                return result;
            });
    }, async GETDEVICESUSEANALYSIS(context, params) {
        let result;
        return await getDevicesUseanalysis(params)
            .then(res => {
                result = res.data.data;
                context.commit("GETDEVICESUSEANALYSIS", result);
                return result;
            })
            .catch(err => {
                result = err;
                return result;
            });
    }, async GETDEVICEALARMLIST(context, params) {
        let result;
        return await getDeviceAlarmList(params)
            .then(res => {
                result = res.data.data;
                context.commit("GETDEVICEALARMLIST", result);
                return result;
            })
            .catch(err => {
                result = err;
                return result;
            });
    }, async GETTOTALALARMLISTBYDEVICES(context, params) {
        let result;
        return await getTotalAlarmListByDevices(params)
            .then(res => {
                result = res.data.data;
                context.commit("GETTOTALALARMLISTBYDEVICES", result);
                return result;
            })
            .catch(err => {
                result = err;
                return result;
            });
    }

};

export default { namespaced: true, state, mutations, actions };
