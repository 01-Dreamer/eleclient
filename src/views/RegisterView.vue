<template>

    <div class="row  bg-primary text-white mx-0">
        <div class="col text-center py-2">
            用户注册
        </div>
    </div>

    <Content>
        <div class="input-group mb-3">
            <label class="input-group-text" for="emailInput">邮箱</label>
            <input type="email" class="form-control" id="emailInput" placeholder="请输入你的邮箱地址..." required>
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="passwordInput">密码</label>
            <input type="password" class="form-control" id="passwordInput" placeholder="请输入你的密码..." required>
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="passwordInput">重复密码</label>
            <input type="password" class="form-control" id="passwordInput" placeholder="请重复你的密码..." required>
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="captchaInput">验证码</label>
            <input type="text" class="form-control" id="captchaInput" placeholder="请输入验证码..." required>
            <img :src="captchaImage" alt="加载中..." class="img-fluid"
                style="height: 38px; object-fit: contain; width: auto;" @click="refreshCaptcha">
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="emailCaptchaInput">邮箱验证码</label>
            <input type="text" class="form-control" id="emailCaptchaInput" placeholder="请输入邮箱验证码..." required>
        </div>
        <button type="button" class="btn btn-success w-100 mb-3">注册</button>
        <router-link class="btn btn-outline-secondary w-100" :to="{ name: 'login' }">去登陆</router-link>
    </Content>

</template>


<script>
import Content from '@/components/ContentBase.vue';
import store from '@/store';
import { ref } from 'vue';
import $ from 'jquery';

export default {
    name: "RegisterView",
    components: {
        Content,
    },

    setup() {

        // 获取验证码
        const captchaImage = ref('');
        const refreshCaptcha = () => {
            $.ajax({
                url: 'https://data.zxylearn.top/captcha',
                type: 'GET',
                success: (response) => {
                    captchaImage.value = 'data:image/png;base64,' + response.captchaBase64;
                },
                error: (error) => {
                    console.error(error);
                }
            });
        }

        if (!store.state.is_login) refreshCaptcha();

        return {
            captchaImage,
            refreshCaptcha,
        }
    }

}
</script>


<style scoped>
.input-group-text {
    width: 96px;
    justify-content: center;
}
</style>