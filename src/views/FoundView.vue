<template>

    <div class="row  bg-primary text-white d-flex align-items-center" style="height:40px">
        <div class="col text-center">
            商家列表
        </div>
    </div>

    <Content>

        <div class="card">
            <div class="card-body">
                <div class="row">


                    <div class="col-1 img-field">
                        <img :src="logo" class="img-fluid" alt="无法找到图片">
                    </div>
                    <div class="col-11">

                    </div>
                </div>
            </div>
        </div>



    </Content>

</template>


<script>
import Content from '@/components/ContentBase.vue';
import logo from '@/assets/logo.png';

export default {
    name: "FoundView",
    components: {
        Content,
    },

    setup() {
        return {
            logo,
        }
    }
}
</script>

<style scoped></style>