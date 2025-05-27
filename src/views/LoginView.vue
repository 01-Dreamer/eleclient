<template>
  <HeaderBase>
    用户登录
  </HeaderBase>

  <div class="login-input">
    <el-form-item class="input-form" label="邮箱:">
      <el-input v-model="email" placeholder="请输入邮箱..."></el-input>
    </el-form-item>
    <el-form-item class="input-form" label="密码:">
      <el-input v-model="password" show-password placeholder="请输入密码..."></el-input>
    </el-form-item>
    <el-form-item class="input-form" label="验证码:">
      <div class="captcha-content">
        <el-input class="captcha-text" v-model="captcha_img_text" placeholder="请输入验证码..."></el-input>
        <img class="captcha-img" :src="captcha_img_url" @click="getCaptchaImg">
      </div>
    </el-form-item>
  </div>

  <div class="button-group">
    <el-button class="login-btn" type="primary" @click="handleLogin" @keyup.enter="handleLogin">登录</el-button>
    <router-link :to="{ name: 'register' }">
      <el-button class="register-btn">去注册</el-button>
    </router-link>
  </div>

</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";
import { showInfoToUser } from '@/utils/notice';
import router from '@/router/index';
import store from '@/store';
import $ from 'jquery';
import { ref } from 'vue';


export default {
  name: "LoginView",

  components: {
    HeaderBase,
  },

  setup() {

    const email = ref('');
    const password = ref('');
    const captcha_img_text = ref('');
    const captcha_img_url = ref('');



    // 向后端请求图形验证码
    let captcha_img_id = null;
    const getCaptchaImg = () => {
      $.ajax({
        url: 'http://localhost:12345/captchaImg',
        type: 'GET',
        xhrFields: {
          responseType: 'blob'
        },
        success: (blob, textStatus, xhr) => {
          captcha_img_url.value = URL.createObjectURL(blob);
          captcha_img_id = xhr.getResponseHeader("imgCaptchaId");
          console.log("captcha_img_id:", captcha_img_id);
        },
        error: (error) => {
          console.error('failed to get captcha image:', error);
        }
      });
    };

    // 第一次进入登录页面自动请求图形验证码
    setTimeout(() => {
      if (!store.state.is_login) {
        getCaptchaImg();
      }
    }, 10);

    // 处理登录
    const handleLogin = () => {
      if (email.value === '') {
        showInfoToUser("请输入邮箱", "error");
      } else if (password.value === '') {
        showInfoToUser("请输入密码", "error");
      } else if (captcha_img_text.value === '') {
        showInfoToUser("请输入验证码", "error");
      } else {

        const login_data = {
          email: email.value,
          password: password.value,
          captchaImgId: captcha_img_id,
          captchaImgText: captcha_img_text.value,
        };

        $.ajax({
          url: 'http://localhost:12345/login',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(login_data),
          complete: function (xhr) {
            switch (xhr.status) {
              case 200: {
                showInfoToUser("登录成功", "success");
                const refresh_token = xhr.responseJSON.userRefreshToken;
                console.log("refresh_token:", refresh_token);
                store.dispatch("login", {
                  id: xhr.responseJSON.userId,
                  email: email.value,
                  avatar: xhr.responseJSON.avatar,
                  refresh_token: refresh_token,
                  is_login: true,
                });

                // 在前端存储长期jwt令牌
                localStorage.setItem('refresh_token', refresh_token);

                router.push({ name: "home" });
                break;
              }
              case 401: {
                if (xhr.responseJSON.errorCaptcha) {
                  showInfoToUser("验证码错误", "error");

                }
                else if (xhr.responseJSON.errorEmailOrPasswd) {
                  showInfoToUser("邮箱或密码错误", "error");
                }
                else {
                  console.error("unknown_error:", xhr.responseText);
                }
                console.log("unauthorized");
                break;
              }
              case 0: {
                console.error("failed to connect network");
                showInfoToUser("网络连接失败", "error");
                break;
              }
              case 500: {
                console.error("server is busy");
                showInfoToUser("服务器繁忙", "error");
                break;
              }
              default: {
                console.error("unknown_status:", xhr.status, xhr.responseText);
                showInfoToUser("请求异常", "error");
              }
            }
          }
        });
      }
    };


    return {
      email,
      password,
      captcha_img_text,
      captcha_img_url,

      getCaptchaImg,
      handleLogin,
    }
  },
}
</script>


<style scoped>
.login-input {
  margin-top: 14vw;
}

.login-input .input-form {
  height: 8vw;
}

.login-input .input-form .captcha-content {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.login-input .input-form .captcha-content .captcha-text {
  width: 60%;
}

.login-input .input-form .captcha-content .captcha-img {
  width: 40%;
}

.button-group {
  display: flex;
  flex-direction: column;

  width: 100%;
}

.button-group .login-btn {
  width: 100%;
  cursor: pointer;
  margin-left: 0;
}

.button-group .register-btn {
  width: 100%;
  cursor: pointer;
  margin-left: 0;
  margin-top: 2vw;
}
</style>
