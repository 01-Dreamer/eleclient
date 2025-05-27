import { createStore } from 'vuex'
import $ from 'jquery';

export default createStore({
  state: {
    id: -1,
    email: "",
    avatar: "https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/DefaultAvatar.png",

    refresh_token: "",
    access_token: "",
    tokenInterval: null,

    is_login: false,

    longitude: -999,
    latitude: -999,
    location_text: "",

    socket: null,
  },
  getters: {
  },
  mutations: {

    updateUser(state, user) {
      state.id = user.id;
      state.email = user.email;

      if ('avatar' in user && user.avatar !== null) {
        state.avatar = user.avatar;
      }

      state.refresh_token = user.refresh_token;
      state.access_token = user.access_token;
      state.is_login = user.is_login;
    },

    updateAvatar(state, avatar) {
      state.avatar = avatar;
    },

    updateAccessToken(state, access_token) {
      state.access_token = access_token;
    },

    updateTokenInterval(state, tokenInterval) {
      state.tokenInterval = tokenInterval;
    },

    updateLocation(state, location) {
      state.longitude = location.longitude;
      state.latitude = location.latitude;
      state.location_text = location.location_text;
    },

    updateSocket(state, socket) {
      state.socket = socket;
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

      $.ajax({
        url: 'http://localhost:12345/logout',
        type: 'POST',
        headers: {
          'Authorization': `Bearer ${context.state.refresh_token}`
        },
        complete: function (xhr) {
          switch (xhr.status) {
            case 200: {
              console.log("success to logout");
              break;
            }
            case 401: {
              console.error("error:", xhr.responseJSON.error);
              break;
            }
            case 0: {
              console.error("network connection failed");
              break;
            }
            case 500: {
              console.error("server is busy");
              break;
            }
            default: {
              console.error("unknown_status:", xhr.status, xhr.responseText);
            }
          }
        }
      });

      context.commit("logout");

    },

    updateAvatar(context, avatar) {
      context.commit("updateAvatar", avatar);
    },

    updateLocation(context, location) {
      context.commit("updateLocation", location);
    },

    updateSocket(context, socket) {
      context.commit("updateSocket", socket);
    },

  },
  modules: {
  }
})
