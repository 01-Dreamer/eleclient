<template>
  <HeaderBase>
    用户注册
  </HeaderBase>

  <div class="register-input">
    <el-form-item class="input-form" label="邮箱:">
      <el-input v-model="email" placeholder="请输入邮箱..."></el-input>
    </el-form-item>
    <el-form-item class="input-form" label="密码:">
      <el-input v-model="password" show-password placeholder="请输入密码..."></el-input>
    </el-form-item>
    <el-form-item class="input-form" label="确认密码:">
      <el-input v-model="confirm_password" show-password placeholder="请确认密码..."></el-input>
    </el-form-item>
    <el-form-item class="input-form" label="验证码:">
      <div class="captcha-content">
        <el-input v-model="captcha_email_text" placeholder="请输入邮箱验证码..."></el-input>
        <el-button class="captcha-btn" type="primary" @click="getCaptchaEmail" :disabled="disable_btn_countdown > 0">
          {{ disable_btn_countdown > 0 ? disable_btn_countdown + '秒后重试' : '获取验证码' }}
        </el-button>
      </div>
    </el-form-item>
  </div>

  <div class="button-group">
    <el-button class="register-btn" type="primary" @click="handleRegister" @keyup.enter="handleRegister">注册</el-button>
    <router-link :to="{ name: 'login' }">
      <el-button class="login-btn">去登录</el-button>
    </router-link>
  </div>
</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";
import { showInfoToUser } from '@/utils/notice';
import router from '@/router/index';
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
    const confirm_password = ref('')
    const captcha_email_text = ref('');
    const disable_btn_countdown = ref(-1);


    // 向后端请求邮箱验证码
    let captcha_email_id = null;
    const getCaptchaEmail = () => {
      if (!email.value) {
        showInfoToUser("请输入邮箱", "error");
        return;
      }

      $.ajax({
        url: 'https://data.zxylearn.top/captchaEmail?email=' + encodeURIComponent(email.value),
        type: 'GET',
        dataType: 'json',
        complete: function (xhr) {
          switch (xhr.status) {
            case 200: {
              captcha_email_id = xhr.responseJSON.emailCaptchaId;
              startCountdown(300);
              showInfoToUser("验证码发送成功", "success");
              console.log("captcha_email_id:", captcha_email_id);
              break;
            }
            case 429: {
              const wait_time = parseInt(xhr.responseJSON?.wait || 300);
              startCountdown(wait_time);
              showInfoToUser(`请${wait_time}秒后重试`, "warning");
              break;
            }
            case 400: {
              showInfoToUser("验证码发送失败", "error");
              break;
            }
            case 409: {
              showInfoToUser("邮箱被注册", "error");
              break;
            }
            case 0: {
              showInfoToUser("网络连接失败", "error");
              break;
            }
            case 500: {
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
    };

    // 合法密码的正则表达式
    const isValidPassword = (str) => /^[A-Za-z0-9]{1,20}$/.test(str);

    // 处理注册
    const handleRegister = () => {
      if (email.value === '') {
        showInfoToUser("请输入邮箱", "error");
      } else if (password.value === '') {
        showInfoToUser("请输入密码", "error");
      } else if (!isValidPassword(password.value)) {
        showInfoToUser("密码只能由 1-20 位字母或数字组成", "error", 1500);
      } else if (confirm_password.value === '') {
        showInfoToUser("请确认密码", "error");
      } else if (password.value != confirm_password.value) {
        showInfoToUser("两次输入的密码不一致", "error");
      } else if (captcha_email_text.value === '') {
        showInfoToUser("请输入验证码", "error");
      } else {

        const register_data = {
          email: email.value,
          password: password.value,
          captchaEmailId: captcha_email_id,
          captchaEmailText: captcha_email_text.value,
        };

        $.ajax({
          url: 'https://data.zxylearn.top/register',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(register_data),
          complete: function (xhr) {
            switch (xhr.status) {
              case 200: {
                showInfoToUser("注册成功", "success");
                router.push({ name: "home" });
                break;
              }
              case 401: {
                showInfoToUser("验证码错误", "error");
                break;
              }
              case 403: {
                showInfoToUser("非法密码", "error");
                console.error("error:", xhr.responseJSON.error);
                break;
              }
              case 409: {
                showInfoToUser("邮箱被注册", "error");
                break;
              }
              case 0: {
                showInfoToUser("网络连接失败", "error");
                break;
              }
              case 500: {
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

    // 处理按钮禁用倒计时
    let countdownTimer = null;
    const startCountdown = (wait_time) => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }

      disable_btn_countdown.value = wait_time;
      countdownTimer = setInterval(() => {
        disable_btn_countdown.value--;

        if (disable_btn_countdown.value <= 0) {
          clearInterval(countdownTimer);
          countdownTimer = null;
        }
      }, 1000);
    };


    return {
      email,
      password,
      confirm_password,
      captcha_email_text,
      disable_btn_countdown,


      handleRegister,
      getCaptchaEmail,
    }
  },
}
</script>


<style scoped>
.register-input {
  margin: 14vw 2vw auto 2vw;
}

.register-input .input-form {
  height: 8vw;
}

.register-input .input-form .captcha-content {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.register-input .input-form .captcha-content .captcha-text {
  width: 60%;
}

.register-input .input-form .captcha-content .captcha-btn {
  width: 40%;
  cursor: pointer;
  margin-left: 1vw;
}

.button-group {
  display: flex;
  flex-direction: column;

  margin: auto 2vw;
}

.button-group .register-btn {
  width: 100%;
  cursor: pointer;
  margin-left: 0;
}

.button-group .login-btn {
  width: 100%;
  cursor: pointer;
  margin-left: 0;
  margin-top: 2vw;
}
</style>
