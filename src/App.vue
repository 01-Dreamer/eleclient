<template>

  <div class="wrapper">
    <router-view />
    <NavBar class="footer" />
  </div>

</template>


<script>
import NavBar from './components/NavBar.vue';
import router from '@/router/index';
import store from '@/store';
import $ from 'jquery';

export default {
  components: {
    NavBar,
  },

  setup() {
    // 使用前端存储的长期Jwt令牌请求登录
    const refresh_token = localStorage.getItem('refresh_token');
    console.log("refresh_token in localStorage: ", refresh_token);
    if (refresh_token !== null && !store.state.is_login) {
      $.ajax({
        url: 'http://localhost:12345/loginByRefreshToken',
        type: 'POST',
        headers: {
          'Authorization': `Bearer ${refresh_token}`
        },
        complete: function (xhr) {
          switch (xhr.status) {
            case 200: {
              store.dispatch("login", {
                id: xhr.responseJSON.userId,
                email: xhr.responseJSON.email,
                avatar: xhr.responseJSON.avatar,
                refresh_token: refresh_token,
                longitude: xhr.responseJSON.longitude,
                latitude: xhr.responseJSON.latitude,
                location_text: xhr.responseJSON.address,
                is_login: true
              });

              router.push({ name: "home" });
              break;
            }
            case 401: {
              localStorage.removeItem('refresh_token');
              console.log("unauthorized");
              break;
            }
            case 0: {
              console.error("failed to connect network");
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
  }
}

</script>


<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;

  z-index: 2000;
}
</style>
