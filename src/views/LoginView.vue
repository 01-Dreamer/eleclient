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
        <el-input class="captcha-text" v-model="captcha_text" placeholder="请输入验证码..."></el-input>
        <img class="captcha-img" src="../img/captcha.png">
      </div>
    </el-form-item>
  </div>

  <div class="button-group">
    <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
    <router-link :to="{ name: 'register' }">
      <el-button class="register-btn">注册</el-button>
    </router-link>
  </div>

</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";
import {ElNotification} from "element-plus";
import {ref} from 'vue'


export default {
  name: "LoginView",

  components: {
    HeaderBase,
  },

  setup() {

    const email = ref('');
    const password = ref('');
    const captcha_text = ref('');

    const handleLogin = () => {

      ElNotification({

        title: '成功',
        message: '登录成功！',
        type: 'success',
        duration: 1000,
        center: true,
        showClose: true,
      });

    }

    return {
      email,
      password,
      captcha_text,
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

  margin-left: 0;
}

.button-group .register-btn {
  width: 100%;

  margin-left: 0;
  margin-top: 2vw;
}
</style>
