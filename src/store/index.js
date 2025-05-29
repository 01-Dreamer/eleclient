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

    longitude: -999,
    latitude: -999,
    location_text: "",

    is_login: false,

    socket: null,
    is_chat: -1,
    msg_count: new Map(),
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

    updateIsChat(state, is_chat) {
      state.is_chat = is_chat;
    },

    clearMsgCount(state, key) {
      const map = new Map(state.msg_count);
      map.set(key, 0);
      state.msg_count = map;
    },

    addMsgCount(state, key) {
      if (String(key) === String(state.is_chat) || String(key) === String(state.id)) {
        return;
      }
      const map = new Map(state.msg_count);
      const value = map.get(key) || 0;
      map.set(key, value + 1);
      state.msg_count = map;
    },

    logout(state) {

      if (state.socket) {
        try {
          state.socket.close(1000, "user logout");
          console.log("websocket close");
        } catch (error) {
          console.error("failed to close websocket: ", error);
        }
        state.socket = null;
      }

      state.id = -1;
      state.email = "";
      state.refresh_token = "";
      state.access_token = "";
      state.is_login = false;
      state.tokenInterval = null;
    },

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
      setTimeout(() => {
        context.dispatch('createWebsocket');
      }, 1000);
      const tokenInterval = setInterval(() => {
        refreshToken();
      }, 280 * 1000);

      context.commit("updateTokenInterval", tokenInterval);
    },

    logout(context, isTokenBlack) {

      if (isTokenBlack) {
        $.ajax({
          url: 'http://localhost:12345/logout',
          type: 'POST',
          headers: {
            'Authorization': `Bearer ${context.state.refresh_token}`
          },
          complete: function (xhr) {
            switch (xhr.status) {
              case 200: {
                console.log("the refresh token has been successfully added to the blacklist");
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
      }

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

    updateIsChat(context, is_chat) {
      context.commit("updateIsChat", is_chat);
    },

    clearMsgCount(context, key) {
      context.commit("clearMsgCount", key);
    },

    addMsgCount(context, key) {
      context.commit("addMsgCount", key);
    },

    createWebsocket(context) {
      $(document).ready(function () {

        const _socket = new WebSocket(`ws://localhost:12345/chat?token=${context.state.access_token}`);
        _socket.onopen = function () {
          console.log("websocket connect");
          context.commit("updateSocket", _socket);
        };

        _socket.onmessage = function (event) {
          const message = JSON.parse(event.data);
          const key = message.senderId;
          context.commit("addMsgCount", key);
        };

        _socket.onclose = function () {
          console.log("websocket close");
          setTimeout(() => {
            context.commit("updateSocket", null);
          }, 1000);
        };

        _socket.onerror = function (error) {
          console.error("websocket error:", error);
          setTimeout(() => {
            context.commit("updateSocket", null);
          }, 1000);
        };

      });
    }



  },
  modules: {

  }


})
