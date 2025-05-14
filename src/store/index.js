import { createStore } from 'vuex'

export default createStore({
  state: {
    id: -1,
    email: "",
    refresh_token: "",
    access_token: "",
    is_login: false,
  },
  getters: {
  },
  mutations: {

    updateUser(state, user) {
      state.id = user.id;
      state.email = user.email;
      state.refresh_token = user.refresh_token;
      state.access_token=user.access_token;
      state.is_login = user.is_login;
    },

    updateAccessToken(state, access_token) {
      state.access_token = access_token;
    },

  },
  actions: {

    login(context) {
      context.commit("updateUser", {
        id: 1,
        email: "2711339704@qq.com",
        refresh_token: "zxylearn",
        is_login: true,
      })
    },

    logout(context) {
      context.commit("updateUser", {
        id: -1,
        email: "",
        refresh_token: "",
        access_token: "",
        is_login: false,
      })
    },

  },
  modules: {
  }
})
