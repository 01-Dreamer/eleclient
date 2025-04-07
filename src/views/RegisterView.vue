<template>

    <div class="row  bg-primary text-white">
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
        <button type="button" class="btn btn-primary w-100 mb-3">登录</button>
        <router-link class="btn btn-outline-secondary w-100" :to="{ name: 'register' }">注册</router-link>
    </Content>

</template>


<script>
import Content from '@/components/ContentBase.vue';

export default {
    name: "RegisterView",
    components: {
        Content,
    }
}
</script>

<style scoped></style>