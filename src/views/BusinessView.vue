<template>

    <div class="row  bg-primary text-white d-flex align-items-center mx-0" style="height:40px">
        <div class="col text-center">
            商家信息
        </div>
    </div>

    <Content>
        <div class="d-flex justify-content-center">
            <img src="/img/img/sj01.png" alt="Error-Img">
        </div>
        <div class="d-flex justify-content-center">
            <strong>万家饺子（软件园E18店）</strong>
        </div>
        <div class="d-flex justify-content-center">
            ¥15起送 | ¥3配送
        </div>
        <div class="d-flex justify-content-center">
            各种饺子炒菜
        </div>
    </Content>

</template>


<script>
import Content from '@/components/ContentBase.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
    name: "BusinessView",
    components: {
        Content,
    },

    setup() {
        const route = useRoute();
        const user_id = ref(route.params.user_id);

        return {
            user_id,
        }
    }

}
</script>

<style scoped></style>