<template>


    <div class="row  bg-primary text-white d-flex align-items-center mx-0" style="height:40px">
        <div class="col text-center">
            商家列表
        </div>
    </div>

    <div class="card" v-for="business in Businesses" :key="business.id">
        <div class="card-body" @click="ClickBusiness(business.id)">
            <div class="row">
                <div class="col-4">
                    <img :src="business.img_url" class="img-fluid" alt="Error-Img">
                </div>
                <div class="col-8 ps-0 d-flex flex-column justify-content-center">
                    <p class="m-0"><strong>{{ business.p1 }}</strong></p>
                    <p class="m-0">{{ business.p2 }}</p>
                    <p class="m-0">{{ business.p3 }}</p>
                </div>
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
                p1: '饺子之家',
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

<style scoped></style>