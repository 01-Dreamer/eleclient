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
    <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
    <router-link :to="{ name: 'register' }">
      <el-button class="register-btn">去注册</el-button>
    </router-link>
  </div>

</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";
import { showInfoToUser } from '@/utils/notice';
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


    /*
    const login = () => {
      const loginData = {
        email: email.value,
        password: password.value
      };

      $.ajax({
        url: 'http://localhost:12345/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(loginData),
        success: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      });
    };*/

    // 向后端请求图形验证码
    const getCaptchaImg = () => {
      $.ajax({
        url: 'http://localhost:12345/captchaImg',
        type: 'GET',
        xhrFields: {
          responseType: 'blob'
        },
        success: (blob, status, xhr) => {
          captcha_img_url.value = URL.createObjectURL(blob);
          const captcha_img_Id = xhr.getResponseHeader("imgCaptchaId");
          console.log("captcha_img_Id:", captcha_img_Id);
        },
        error: (error) => {
          console.error('failed to get captcha image:', error);
        }
      });
    };

    // 第一次进入登录页面自动请求图形验证码
    if (!store.state.is_login) getCaptchaImg();

    // 处理登录
    const handleLogin = () => {
      if(email.value === '') {
        showInfoToUser("请输入邮箱", "error");
      } else if(password.value === '') {
        showInfoToUser("请输入密码", "error");
      } else if(captcha_img_text.value === '') {
        showInfoToUser("请输入验证码", "error");
      } else {
        showInfoToUser("登录成功", "success");
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
