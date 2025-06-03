import { createStore } from 'vuex'
import $ from 'jquery';

export default createStore({
  state: {
    id: -1,
    email: null,
    avatar: "https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/DefaultAvatar.png",

    refresh_token: null,
    access_token: null,
    tokenInterval: null,

    longitude: 102.850549,
    latitude: 24.826936,
    location_text: "云南大学软件学院",

    socket: null,
    is_chat: -1,
    msg_count: new Map(),

    is_login: false,
  },
  getters: {
  },

  ///////////////////////////////////////////////////
  /// 同步操作
  ///////////////////////////////////////////////////
  mutations: {
    updateUser(state, user) {
      state.id = user.id;
      state.email = user.email;

      if ('avatar' in user && user.avatar !== null && user.avatar !== '') {
        state.avatar = user.avatar;
      }

      state.refresh_token = user.refresh_token;
      state.access_token = user.access_token;
      state.is_login = user.is_login;

      if ('location_text' in user && user.location_text !== null && user.location_text !== '') {
        state.longitude = user.longitude;
        state.latitude = user.latitude;
        state.location_text = user.location_text;
      }
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
      if (socket && socket instanceof WebSocket) {
        state.socket = socket;
      } else {
        console.warn("invalid socket: ", socket);
        state.socket = null;
      }
    },

    updateIsChat(state, is_chat) {
      state.is_chat = is_chat;
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

    clearMsgCount(state, key) {
      const map = new Map(state.msg_count);
      map.set(key, 0);
      state.msg_count = map;
    },

    logout(state) {
      state.id = -1;
      state.email = null;
      state.refresh_token = null;
      state.access_token = null;
      state.is_login = false;
      state.tokenInterval = null;
    },
  },
  ///////////////////////////////////////////////////
  /// 同步+异步操作
  ///////////////////////////////////////////////////
  actions: {

    ///////////////////////////////////////////////////
    /// 登录
    ///////////////////////////////////////////////////
    login(context, user) {
      context.commit("updateUser", user);

      const refreshToken = () => {
        $.ajax({
          url: 'https://data.zxylearn.top/getAccessToken',
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

                // 如果websocket连接断开了,重新建立连接
                if (context.state.socket === null) {
                  context.dispatch('createWebsocket');
                }

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

      // 每280s刷新一次短期Jwt令牌
      const tokenInterval = setInterval(() => {
        refreshToken();
      }, 280 * 1000);

      context.commit("updateTokenInterval", tokenInterval);
    },

    ///////////////////////////////////////////////////
    /// 退出登录
    ///////////////////////////////////////////////////
    logout(context, isTokenBlack) {
      // 记录Jwt令牌黑名单
      if (isTokenBlack) {
        $.ajax({
          url: 'https://data.zxylearn.top/logout',
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

      // 关闭websokcet连接
      if (context.state.socket) {
        try {
          context.state.socket.close(1000, "user logout");
          console.log("websocket close");
        } catch (error) {
          console.error("failed to close websocket: ", error);
        } finally {
          context.commit("updateSocket", null);
        }
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

    addMsgCount(context, key) {
      context.commit("addMsgCount", key);
    },

    clearMsgCount(context, key) {
      context.commit("clearMsgCount", key);
    },

    ///////////////////////////////////////////////////
    /// 建立websocket连接
    ///////////////////////////////////////////////////
    createWebsocket(context) {
      $(document).ready(function () {
        const _socket = new WebSocket(`wss://data.zxylearn.top/chat?token=${context.state.access_token}`);
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
          if (context.state.socket) {
            context.commit("updateSocket", null);
          }
        };

        _socket.onerror = function (error) {
          console.error("websocket error:", error);
          if (context.state.socket) {
            context.commit("updateSocket", null);
          }
        };
      });
    }
  },
  modules: {

  }
})
