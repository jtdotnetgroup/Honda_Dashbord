import { Login } from "@/api/account";

const state = {
  access_token: ''
};

const mutations = {
  GETTOKEN: (state, payload) => {
    state.access_token = payload;
    sessionStorage.setItem('access_token', state.access_token);
  }
};

const actions = {
  async GetToken(context, params) {
    // if (state.access_token !== '') { return state.access_token; }
    let result;
    return await Login(params)
      .then(res => {
        console.log(res)
        result = res.data.data.access_token;
        context.commit("GETTOKEN", result);
        return result;
      })
      .catch(err => {
        result = err;
        return result;
      });
  }
};

export default { namespaced: true, state, mutations, actions };
