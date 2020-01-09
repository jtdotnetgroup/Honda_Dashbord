import { Login } from "@/api/account";

const state = {
  access_token: '',
  company_credential: 'company_credential'
};

const mutations = {
  GETTOKEN: (state, payload) => {
    localStorage.setItem('token', payload)
    state.access_token = payload;
  }
};

const actions = {
  async GetToken(context, params) {
    if (state.access_token !== '') { return state.access_token; }
    return new Promise(async (resolve, reject) => {
      await Login(params)
        .then(res => {
          // console.log(res)
          const result = res.data.data.access_token;
          context.commit("GETTOKEN", result);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    })
  }
};


const getters = {
  token: state => {
    
      return localStorage.getItem('token')
    
  }
}

export default { namespaced: true, state, mutations, actions, getters };
