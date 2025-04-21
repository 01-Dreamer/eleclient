<template>

    <div class="row  bg-primary text-white d-flex align-items-center mx-0" style="height:40px">
        <div class="col text-center">
            商家界面
        </div>
    </div>

    <Content>
        商家id: {{ user_id }}
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