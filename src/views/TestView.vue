<template>

    <div class="row bg-primary text-white d-flex align-items-center mx-0" style="height:40px">
        <div class="col text-center">
            测试
        </div>
    </div>


    <div class="card" v-for="business in Businesses" :key="business.id">
        <div class="card-body d-flex align-items-stretch" @click="ClickBusiness(business.id)">
            <div class="flex-shrink-0 me-1" style="width: 100px;">
                <img :src="business.img_url" class="h-100 w-100" alt="Error-Img" style="object-fit: cover;">
            </div>
            <div class="d-flex flex-column flex-grow-1">
                <p class="m-0 flex-grow-1 d-flex align-items-center text-truncate"><strong>{{ business.p1 }}</strong></p>
                <p class="m-0 flex-grow-1 d-flex align-items-center text-truncate">{{ business.p2 }}</p>
                <p class="m-0 flex-grow-1 d-flex align-items-center text-truncate">{{ business.p3 }}</p>
            </div>
        </div>
    </div>



</template>


<script>
import router from '@/router'

export default {
    name: "FoundView",
    components: {

    },

    setup() {

        const ClickBusiness = (user_id) => {
            router.push({
                name: "business",
                params: {
                    user_id
                }
            })
        }

        const Businesses = [
            {
                id: 1,
                img_url: '/img/img/sj01.png',
                p1: '万家饺子（软件园E18店）',
                p2: '¥15起送 | ¥3配送',
                p3: '各种饺子炒菜'
            },
            {
                id: 2,
                img_url: '/img/img/sj01.png',
                p1: '饺子之家AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                p2: '¥20起送 | ¥5配送',
                p3: '手工饺子，口感极佳'
            }
        ]

        return {
            ClickBusiness,
            Businesses,
        }
    }
}
</script>

<style scoped>
</style>