<template>

    <ul class="nav">
        <router-link class="link" :to="{ name: 'home' }">
            <li>
                <i class="fa fa-home"></i>
                <span>首页</span>
            </li>
        </router-link>
        <router-link class="link" :to="{ name: 'found' }">
            <li>
                <i class="fa fa-compass"></i>
                <span>发现</span>
            </li>
        </router-link>
        <router-link class="link" :to="{ name: 'order' }">
            <li>
                <i class="fa fa-file-text-o"></i>
                <span>订单</span>
            </li>
        </router-link>
        <router-link class="link" :to="{ name: 'mine' }">
            <li>
                <i class="fa fa-user-o"></i>
                <span>我的</span>
            </li>
        </router-link>
    </ul>

</template>


<script>

export default {
    name: "NavBar"
}

</script>


<style scoped>
.nav {
    width: 100%;
    height: 14vw;
    border-top: solid 1px #DDD;
    background-color: #fff;

    display: flex;
    justify-content: space-around;
    align-items: center;

    padding-left: 0;
}

.nav .link {
    text-decoration: none;
}

.nav .link li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: #999;
    user-select: none;
    cursor: pointer;
}

.nav .link li i {
    font-size: 5vw;
}

.nav .link li span {
    font-size: 2.8vw;
    margin-top: 0.5vw;
}
</style>