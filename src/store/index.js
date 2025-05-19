import { createStore } from 'vuex'
import $ from 'jquery';

export default createStore({
  state: {
    id: -1,
    email: "",
    refresh_token: "",
    access_token: "",
    is_login: false,
    tokenInterval: null,
  },
  getters: {
  },
  mutations: {

    updateUser(state, user) {
      state.id = user.id;
      state.email = user.email;
      state.refresh_token = user.refresh_token;
      state.access_token = user.access_token;
      state.is_login = user.is_login;
    },

    updateAccessToken(state, access_token) {
      state.access_token = access_token;
    },

    updateTokenInterval(state, tokenInterval) {
      state.tokenInterval = tokenInterval;
    },

    logout(state) {
      state.id = -1;
      state.email = "";
      state.refresh_token = "";
      state.access_token = "";
      state.is_login = false;
      state.tokenInterval = null;
    }

  },
  actions: {

    login(context, user) {
      context.commit("updateUser", user);

      const refreshToken = () => {

        $.ajax({
          url: 'http://localhost:12345/getAccessToken',
          type: 'POST',
          headers: {
          'Authorization': `Bearer ${context.state.refresh_token}`
        },
          complete: function (xhr) {
            switch (xhr.status) {
              case 200: {
                const access_token = xhr.responseJSON.accessToken;
                context.commit("updateAccessToken", access_token);
                console.log("access_token:", access_token);
                break;
              }
              case 401: {
                console.error("error:", xhr.responseJSON.error);
                context.commit("logout");
                break;
              }
              case 0: {
                console.error("network connection failed");
                context.commit("logout");
                break;
              }
              case 500: {
                console.error("server is busy");
                context.commit("logout");
                break;
              }
              default: {
                console.error("unknown_status:", xhr.status, xhr.responseText);
                context.commit("logout");
              }
            }
          }
        });

      };

      refreshToken();
      const tokenInterval = setInterval(() => {
        refreshToken();
      }, 280 * 1000);

      context.commit("updateTokenInterval", tokenInterval);

    },

    logout(context) {
      context.commit("logout");
    },

  },
  modules: {
  }
})
