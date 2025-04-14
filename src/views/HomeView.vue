<template>
    <div class="container-fluid px-0 text-white bg-primary">
        <div class="row row-cols-1">
            <div class="col" style="height:50px">
                <div style="margin-top:10px;margin-left:10px">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-bullseye" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                        <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                    <span style="padding-left:5px;">云南大学呈贡校区软件学院</span>
                </div>
            </div>
            <div class="col">
                <div style="margin-left:15px;margin-right:15px;">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="searchInput" placeholder="请输入你要搜索的内容..."
                            style="text-align: center;" required>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <Content>
        首页内容
    </Content>

</template>

<script>
import Content from '@/components/ContentBase.vue';

export default {
    name: "HomeView",
    components: {
        Content,
    },

}
</script>


<style scoped></style>